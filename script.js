async function getSongs(){
    let a = await fetch('https://solid-adventure-q6g7qwxpj5c67q6-5502.app.github.dev/songs')
    let response=await a.text()
    // console.log(response)
    let div=document.createElement('div')
    div.innerHTML=response
    let as=div.getElementsByTagName('a')
    let songs=[]
    for(let index=0;index<as.length;index++){
        const element=as[index]
        // console.log(element)
        if (element.href.startsWith('https://solid-adventure-q6g7qwxpj5c67q6-5502.app.github.dev/songs/')) {
            // console.log(element);
            songs.push(element.href.split('/songs/')[1]);
        }
    }
    return(songs)
}

async function main(){
    // Get the first list of songs
    let songs=await getSongs()
    // console.log(songs)

    let songUL=document.querySelector('.songList').getElementsByTagName('ul')[0]
    for(const song of songs){
        songUL.innerHTML+=`<li>${song.replaceAll('%20',' ').replaceAll('%5B','[').replaceAll('%5D',']')}</li>`
    }


    // Play the first song
    var audio = new Audio(songs[1])
    const playButton = document.getElementById('playButton');
    
    audio.addEventListener('loadeddata',()=>{
        playButton.addEventListener('click', () => {
          audio.play()
          let duration=audio.duration
          console.log(duration,audio.currentSrc,audio.currentTime)
        });
    })
}
main()