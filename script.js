document.addEventListener("DOMContentLoaded", (event) => { 
	function monitor(manager) {
	   if (((manager.level * 100) < 10) && manager.charging == false) alert('Plug your charger, your battery is running out!');
	   let level = (manager.level + '').split('.')[1] == undefined ? 100 : (manager.level + '').split('.')[1] < 10 ? (manager.level + '').split('.')[1] + "0" : (manager.level + '').split('.')[1];
	   chrome.browserAction.setBadgeBackgroundColor({ color: "#990000" });
	   chrome.browserAction.setBadgeText({text:'' + level + '%'});
	   displayDischargingTime(manager);
	}
	
	function displayDischargingTime(manager) {
		let hours = Math.floor((manager.dischargingTime / 3600) % 24)
		let str = hours > 1 ? hours + " hours " : hours == 1 ? hours + " hour " : "";
		
		let minutes = parseInt((manager.dischargingTime / 60) % 60);
		if (manager.charging) {
			if (manager.level == 1) {
				document.querySelector('#animation').innerHTML = '<div class="battery"><div class="liquid"></div></div><h5>Full<h5>';
			} else {
				document.querySelector('#animation').innerHTML = '<div class="battery"><div class="liquid"></div></div><h5>Charging<h5>';
			}
		} else {
			document.querySelector('#animation').innerHTML = '';
			if (isNaN(minutes)) {
				document.querySelector('#animation').innerHTML = '<h5>Calculating...<h5>';
			} else {
				document.querySelector('#time').innerHTML = str + minutes + " minutes remains";
			}
		}
	}

	navigator.getBattery().then((manager) => {
	   monitor(manager);
	   
	   manager.onchargingchange = () => { monitor(manager); };
	   
	   manager.onlevelchange = () => { monitor(manager); };
	});
});