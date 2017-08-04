let baseHeight = 170;
let baseWidth = 200;
let baseNumber = 3;
let deviceWidth = document.body.offsetWidth;
window.onresize = function() {
    deviceWidth = document.body.offsetWidth;
    if (deviceWidth > 960) {
        baseHeight = 170
        baseNumber = Math.ceil(960 / 200);
    } else if (deviceWidth > 1920) {
        baseHeight = 250;
        baseNumber = Math.ceil(1920 / 300);
    }
}
let container = document.createElement('div')
    /*nameArr.forEach(function(name, index) {*/
    /*    index)*/
for (var i = 0; i < nameArr.length; i++) {
    if (i % 5 == 0) {
        document.body.appendChild(container);
        container.onload = function() {
            divW = parseFloat(window.getComputedStyle(container).width);
            let currentHeight = divW / deviceWidth / baseHeight;
            console.log(currentHeight)
        }

        container = document.createElement('div')
        container.style.height = baseHeight + "px"

    }
    //图片容器
    let img = document.createElement('img')
    img.src = `./nice/${nameArr[i]}`
    img.style.height = baseHeight + 'px'
    img.onload = function(data) {
            console.log(data.target.offsetWidth)
        }
        //图片容器的容器
    container.classList.add('img_container')
    container.style.height = baseHeight;
    /* container.classList.add(img)*/
    /*container.classList.add('img_container')
    document.body.appendChild(img)*/
    container.appendChild(img)
}

/*});*/
