module.exports = (username, password, name) => (
  `<html>
    <head>
        <title>Playtorium Solution</title>
        
    </head>
    <body>
        <div style="width:100%; margin:auto; height:60em;">
            <div style="">
                <div style="
                position: relative;
                display: block;
                width: 100%;
                height: 15em;" >
                    <img style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto"  
                    src = "logo_original.png" />
                </div>
                <div style="
                position: relative;
                display: block;
                width: 100%;
                height: auto;" >
                    <h1 style="text-align: center;" >Account Registration Information</h1>
                    <div style="width: 50%; margin-left: auto;margin-right: auto;">
                            <div style="background-color: black; height: auto;">
                                <h2 style="color: rgb(255, 255, 255); text-align: center;">Your Registration details</h2>
                            </div>
                        <h2> ยินดีต้อนรับ คุณ${name}</h2>
                        <h2> นี่คือ Username และ Password สำหรับเข้าใช้งานระบบของบริษัท </h2>
                        <h2 style="margin-left: 1em">Username: ${username}</h2>
                        <h2 style="margin-left: 1em">Password: ${password}</h2>
                        <h2>สามารถเข้าใช้งานระบบได้ทันทีคลิก<a href="#">ที่นี่</a><h2></h2>
                    </div>
                </div>
            </div>
        </div>
    </body> 
</html>`
);
