window.onload = () => {
  const btn = document.getElementsByClassName("btn")[0];

  const toLogin = async (username, passwd) => {
    const res = await axios({
      url: "/",
      method: "POST",
      Headers: {
        "Content-Type": "application/json",
      },
      data: {
        username,
        passwd,
      },
    });
    console.log(res);
  };
  
  btn.addEventListener('click', function(e) {  
    e.stopPropagation();//取消事件冒泡
    const userValue = document.getElementById("un").value;
    const passValue = document.getElementById("pwd").value;
    
    toLogin(userValue, passValue);
  })
};
