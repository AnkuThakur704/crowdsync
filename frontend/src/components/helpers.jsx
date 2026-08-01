import socket from "../socket/socket"
const backend_url = import.meta.env.VITE_BACKEND_URL

export const endlive = async (navigate) => {
    const params = new URLSearchParams(window.location.search)
    const params_id = params.get("id")
    const r = await fetch(`${backend_url}/routes/endlive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        qid: params_id
      })
    })
    if (r.status == 200) {
      socket.emit("endpoll", params_id)
      socket.disconnect()
      navigate(`/studio?id=${params_id}`)
    }
}

export const golive = async(navigate, qid)=>{
        const r = await fetch(`${backend_url}/routes/marklive`,{method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                qid: qid
            })
        })
        if(r.status==200){
            navigate(`/hostques?id=${qid}`)
        }
    }