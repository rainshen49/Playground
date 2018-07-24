var app = new Vue({
    el: '#app',
    data: {
        message: 'You loaded this page on ' + new Date()
    }
})
setInterval(()=>app.message='You loaded this page on ' + new Date(),1000)