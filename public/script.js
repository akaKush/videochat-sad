const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, { //posem undefined pq ens és igual el ID
    host: '/', //de host posem el nostre root directory
    port: '3001'
})

const myVideo = document.createElement('video')

myVideo.muted = true //això ens muteja al nostre propi microfon per no causar problemes

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream)  //afegim el video al browser
})

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})


socket.on('user-connected', userId => {
    console.log('User connected:' + userId)
})

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}