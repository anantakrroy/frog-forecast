function OnlineStatus() {
    window.addEventListener('offline', () => false);
    window.addEventListener('online', () => true);
}

export default OnlineStatus;