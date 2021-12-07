var timer;
window.addEventListener("DOMContentLoaded", function() {
    var iconList = [
        "❤",
        "🌈",
        "😂",
        "🐷",
        "👍",
        "😍",
        "😄",
        "😘",
        "😎",
        "🤗",
        "😚",
        "🤑",
        "🤡",
        "🧐",
        "😻",
        "🐱‍🚀",
        "🐵",
        "🐶",
        "🎅",
        "👼",
        "🎈",
        "✨",
        "🎉",
        "🎄",
        "🎉",
        "🎁",
        "🎨",
        "🎵",
        "🥇",
        "🍔",
        "🍟",
        "🌭",
        "🍿",
        "🍬",
        "🍄",
        "🍓",
        "🏵",
        "🌺",
        "🌼",
        "🍁",
        "⭐",
        "🔥",
        "🌍",
        "🛸",
        "🌏",
        "🏝",
        "🌞",
        "🌟",
    ];
    var textList = new Array(
        "富强",
        "民主",
        "文明",
        "和谐",
        "自由",
        "平等",
        "公正",
        "法治",
        "爱国",
        "敬业",
        "诚信",
        "友善"
    );
    document
        .getElementsByTagName("body")[0]
        .addEventListener("click", function(e) {
            doms = document.getElementsByClassName("addAnimatedText");
            if (doms.length > 0) {
                doms[0].remove();
            }
            var spanDom = document.createElement("span");
            spanDom.className = "addAnimatedText";
            const iconIndex = Math.ceil(Math.random() * iconList.length - 1);
            const textIndex = Math.ceil(Math.random() * textList.length - 1);
            spanDom.appendChild(
                document.createTextNode(
                    `${iconList[iconIndex]}${textList[textIndex]}${iconList[iconIndex]}`
                )
            );
            spanDom.style.zIndex = "999999";
            spanDom.style.position = "fixed";
            spanDom.style.left = e.clientX + "px";
            spanDom.style.top = e.clientY - 5 + "px";
            spanDom.style.color =
                "rgb(" +
                ~~(255 * Math.random()) +
                "," +
                ~~(255 * Math.random()) +
                "," +
                ~~(255 * Math.random()) +
                ")";
            document.getElementsByTagName("body")[0].appendChild(spanDom);
            clearInterval(timer);
            setStyle(spanDom, 1500);
            // 需求
            // 总共 2500s   执行一次 10ms    共计多少次 2500/10
            // 花费次数 time=  2500/10;
            function setStyle(spanDom, compliteTime = 2500) {
                let top = e.clientY; //原始Y坐标位置
                let opacity = 1;
                moveTop = 180; //Y坐标移动距离
                let timmerTime = 5; //每10ms执行一次
                let time = 0; //总计花费时间
                timer = setInterval(function() {
                    time++;
                    spanDom.style.top =
                        top - (moveTop / (compliteTime / timmerTime)) * time + "px";
                    spanDom.style.opacity =
                        1 - (1 / (compliteTime / timmerTime)) * time;
                    if (time >= compliteTime / timmerTime) {
                        clearInterval(timer);
                        document.getElementsByClassName("addAnimatedText")[0].remove();
                        return;
                    }
                }, timmerTime);
            }
        });
});