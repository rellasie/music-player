const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const player = $('.player')
const cd = $('.cd')
const cdWidth = cd.offsetWidth
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')

const app = {
    currentIndex: 0, // current index
    isPlaying: false,
    isRandom: false,
    isRepeat: false,

    songs: [
        {
            name: 'the 1',
            singer: 'Taylor Swift',
            path: './assets/music/the 1.mp3',
            image: './assets/img/the 1.png'
        },
        {
            name: 'cardigan',
            singer: 'Taylor Swift',
            path: './assets/music/cardigan.mp3',
            image: './assets/img/cardigan.png'
        },
        {
            name: 'the last great american dynasty',
            singer: 'Taylor Swift',
            path: './assets/music/the last great american dynasty.mp3',
            image: './assets/img/the last great american dynasty.png'
        },
        {
            name: 'exile',
            singer: 'Taylor Swift',
            path: './assets/music/exile.mp3',
            image: './assets/img/exile.png'
        },
        {
            name: 'my tears ricochet',
            singer: 'Taylor Swift',
            path: './assets/music/my tears ricochet.mp3',
            image: './assets/img/my tears ricochet.png'
        },
        {
            name: 'mirrorball',
            singer: 'Taylor Swift',
            path: './assets/music/mirrorball.mp3',
            image: './assets/img/mirrorball.png'
        },
    ],

    render: function () {
        const htmls = this.songs.map(song => {
            return `
                <div class="song">
                    <div class="thumb"                       
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <h3 class="author">${song.singer}</h3>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('')
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvents: function () {
        const _this = this

        // xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, // 10 seconds
            iterations: Infinity, // loop vô hạn
        })
        
        cdThumbAnimate.pause()

        // xử lý phóng to / thu nhỏ CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop // tuong tu nhau
            const newCdWdith = cdWidth - scrollTop

            // console.log(newCdWdith)
            cd.style.width = newCdWdith > 0 ? newCdWdith + 'px' : 0
            cd.style.opacity = newCdWdith / cdWidth
        }

        // xử lý khi click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        // khi song được play
        audio.onplay = function () { 
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        // khi song bị pause
        audio.onpause = function () { 
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        // xử lý khi tua bài hát
        progress.onchange = function(e) {
            const seekTime = audio.duration * e.target.value / 100
            audio.currentTime = seekTime
        }

        // khi next bài hát
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
        }

        // khi prev bài hát
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
        }

        // xử lý bật / tắt random song
        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        // xử lý lặp lại một song
        repeatBtn.onclick = function(e) {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // xử lý next song khi audio ended
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }
    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path

        // console.log(heading, cdThumb, audio) // test
    },

    nextSong: function() {
        this.currentIndex++
        // khi hết bài trước thì nhảy sang bài sau, quay về đầu bài
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong() // load bài tiếp
    },

    prevSong: function() {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1 // trả về phần tử cuối mảng
        }
        this.loadCurrentSong() // load bài tiếp
    },

    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex) // ko random lại vào bài hiện tại

        // console.log(newIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    start: function () {
        // định nghĩa các thuộc tính cho object
        this.defineProperties()

        // lắng nghe, xử lý các sự kiện (DOM events)
        this.handleEvents()

        // tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()

        // render playlist
        this.render()
    }
}

app.start()

