// source of information: https://googlechrome.github.io/samples/service-worker/basic/
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./serviceWorker.js')
	.then( () => {
		console.log('Registration worked!');
	})
	.catch( () => {
		console.log('Registration failed!');
	});
}