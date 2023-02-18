let search = new URLSearchParams(window.location.search);
let i = search.get(`i`);


function getCard() {
    let card = document.querySelector(`.card`);

    card.innerHTML = `
    <div class="row g-2">
        <div class="col-md-4">
            <img
                src="${album[i].img}"
                class="img-fluid rounded-start"
            />
        </div>
        <div class="col-md-8">
            <div class="card-body border-primary">
                <h4 class="card-title">${album[i].title}</h4>
                <p class="card-text">${album[i].description}</p>
                <p class="card-text">
                    <small class="text-muted">${album[i].year}</small><br>
                    <small class="text-muted">${album[i].license}</small>
                </p>
                <a href="#" class="btn listen btn-dark">Слушать <img src="assets2/shuffle.png" style="max-width: 20px"></a>
                <span class="element-heart align-middle p-2"> 
                    <a href="#" class="text-reset text-decoration-none">
                        <img class="heart-img" src="assets2/heart_icon.png" style="max-width: 20px;">
                    </a>
                </span>
            </div>
        </div>
    </div>
    `;
}
getCard();


function getBlock() {
    let block = document.querySelector(`.group-music`);

    for(let j = 0;j <album[0].tracks.length;j++){
        block.innerHTML += `
        <li class="playnode list-group-item d-flex align-items-center">
            <img src="assets2/play_icon.png" id="icon-play" style="max-width: 25px; margin-right: 1%"/>
            <div>
                ${album[0].tracks[j].name}
                <div class="text" style="opacity: 80%">${album[0].tracks[j].author}</div>
            </div>
            <div class="time ms-auto">${album[0].tracks[j].time}</div>
            <audio class="audio" src="${album[0].tracks[j].src}"></audio>
        </li>`;
    }

   
    function getHeart() {
        let heart = document.querySelector(`.element-heart`);
        let heart_icon = document.querySelector(`.heart-img`) 
        heart.addEventListener(`click`, function(){
            if(isPlaying){
                heart.style.backgroundColor = ``;
                heart.style.borderRadius = ``;
                heart_icon.src = `assets2/heart_icon.png`;
                isPlaying = 0;
            } else { 
                heart.style.backgroundColor = `#e4326ae5`;
                heart.style.borderRadius = `15%`;
                heart_icon.src = `assets2/heart_w_icon.png`;
                isPlaying = 1;
            }
        })
    }
    getHeart();
}
getBlock()


let isPlaying = 0;


function setupAudio() {
    // Найди коллекцию с треками
    let trackNodes = document.querySelectorAll(`.playnode`);
    let rand_num = Math.floor(Math.random() * 5)

    for (let i = 0; i < trackNodes.length; i++) { 
        //один эллемент
        let node = trackNodes[i];   
        // Тег аудио внутри этого элемента
        let audio = node.querySelector(`.audio`);
        // let track = album[0].tracks[i];
        let icon_play = node.querySelector(`#icon-play`);
        let timer = node.querySelector(`.time`);
        let listen_btn = document.querySelector(`.listen`)

        listen_btn.addEventListener(`click`, function(){
            let audio = trackNodes[rand_num].querySelector(`.audio`);
            let icon_play = trackNodes[rand_num].querySelector(`#icon-play`);
            let timer = trackNodes[rand_num].querySelector(`.time`);


            audio.play();
            icon_play.src = `assets2/play_w_icon.png`;
            trackNodes[rand_num].style.backgroundColor = `#e4326ae5`;
            trackNodes[rand_num].style.color = `white`;
            isPlaying = 1;
            
            function rupdateProgress() {
                // Нарисовать актуальное время
                let ourtime = getTime(audio.currentTime);
                timer.innerHTML = ourtime;
                // Нужно ли вызвать её ещё раз?
                if (isPlaying) {
                    requestAnimationFrame(rupdateProgress);
                }
            }
            rupdateProgress();
        });
        

        node.addEventListener(`click`, function(){
            if(isPlaying){
                icon_play.src = `assets2/play_icon.png`;
                isPlaying = 0;
                audio.pause();
                node.style.backgroundColor = ``;
                node.style.color = ``;
            } else {
                icon_play.src = `assets2/play_w_icon.png`;
                isPlaying = 1;
                audio.play();
                node.style.backgroundColor = `#e4326ae5`;
                node.style.color = `white`;
                updateProgress()
            }
        });


        function updateProgress() {
            // Нарисовать актуальное время
            let ourtime = getTime(audio.currentTime);
            timer.innerHTML = ourtime;
            // Нужно ли вызвать её ещё раз?
            if (isPlaying) {
                requestAnimationFrame(updateProgress);
            }
            
        }
    }

    // Функция получения времени
    function getTime(time_r) {
        let hours = Math.floor(time_r);
        let minutes = Math.floor(hours / 60);
        let seconds = Math.floor(hours % 60);
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return `${minutes}:${seconds}`;
    }
}
setupAudio()