import io from 'socket.io-client'
const backend_url = import.meta.env.VITE_BACKEND_URL

const socket = io(backend_url,{
    autoConnect:false    // this will prevent the client to connect as soon as the page loads. I have the choice to decide whether to connect or not
    
})

export default socket