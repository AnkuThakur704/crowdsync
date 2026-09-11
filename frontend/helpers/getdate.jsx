const givelastupdated = (updatedAt)=>{

      const dt = new Date(updatedAt);
      const diff = Date.now() - dt;
      const minutes = Math.floor(diff / (1000 * 60));
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      let text;

      if (minutes < 60) {
        text = `${minutes} ${minutes === 1 ? "min" : "mins"} ago`;
      } else if (hours < 24) {
        text = `${hours} ${hours === 1 ? "hr" : "hrs"} ago`;
      } else {
        text = `${days} ${days === 1 ? "day" : "days"} ago`;
      }
      return text;
    
}

export default givelastupdated