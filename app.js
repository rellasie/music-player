const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const app = {
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

    handleEvents: function() {
        const cd = $('.cd')
        const cdWidth = cd.offsetWidth

        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop // tuong tu nhau
            const newCdWdith = cdWidth - scrollTop

            // console.log(newCdWdith)
            cd.style.width = newCdWdith > 0 ? newCdWdith + 'px' : 0
            cd.style.opacity = newCdWdith / cdWidth
        }
    },

    start: function() {
        this.handleEvents()

        this.render()
    }
}

app.start()

