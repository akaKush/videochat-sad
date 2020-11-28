const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, { //posem undefined pq ens és igual el ID
    host: '/', //de host posem el nostre root directory
    port: '3001'
})

const myVideo = document.createElement('video')

myVideo.muted = true //això ens muteja al nostre propi microfon per no causar problemes

const peers = {}

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream)  //afegim el video al browser

    myPeer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })

    socket.on('user-connected', userId => {  //creem conexions amb els altres users
        connectToNewUser(userId, stream) //els hi passem el nostre video amb la funció connectToNewUser()
    })
})

socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)  //afegeix el video dels altres usuaris a la nostre pàgina
    })
    call.on('close', () => {
        video.remove() //eliminem els videos dels altres users quan se'n van de la trucada
    })

    peers[userId] = call
}


function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}