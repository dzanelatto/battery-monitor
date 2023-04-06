function monitor(manager) {
	if (((manager.level * 100) < 10) && manager.charging == false) alert('Plug your charger, your battery is running out!');
	let level = (manager.level + '').split('.')[1] == undefined ? 100 : (manager.level + '').split('.')[1] < 10 ? (manager.level + '').split('.')[1] + "0" : (manager.level + '').split('.')[1];
	chrome.browserAction.setBadgeBackgroundColor({ color: "#990000" });
	chrome.browserAction.setBadgeText({text:'' + level + '%'});
}

navigator.getBattery().then((manager) => {
	monitor(manager);
	manager.onlevelchange = () => { monitor(manager); };
});