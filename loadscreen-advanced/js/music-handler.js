
//YouTube IFrame API player.
var player;

if(config.enableMusic)
{
    //Create DOM elements for the player.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";

    var ytScript = document.getElementsByTagName('script')[0];
    ytScript.parentNode.insertBefore(tag, ytScript);

    //Pick random index to start at.
    var musicIndex = lib.rand(0, config.music.length);
    var title = "";
}

function onYouTubeIframeAPIReady() 
{
    var videoId = config.music[musicIndex];

    player = new YT.Player('player', {
        width: '1',
        height: '',
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'disablekb': 1,
            'enablejsapi': 1,
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError 
        }
    });
}

function onPlayerReady(event) 
{
    title = event.target.getVideoData().title;
    player.setVolume(config.musicVolume);

    play();
}

function onPlayerStateChange(event) 
{
    if(event.data == YT.PlayerState.PLAYING)
    {
        title = event.target.getVideoData().title;
    }

    if (event.data == YT.PlayerState.ENDED) 
    {
        musicIndex++;
        play();
    }
}

function onPlayerError(event)
{
    var idx = musicIndex % config.music.length;
    var vid = config.music[idx];

    switch (event.data) 
    {
        case 2:
            logger.addToLog("O ID do vídeo: " + vid + " parece inválido, id de vídeo errado?" );
            break;
        case 5:
            logger.addToLog("Um problema de HTML 5 player ocorreu no ID do vídeo:" + vid);
        case 100:
            logger.addToLog("Video " + vid + "não existe, link do vídeo errado?" );
        case 101:
        case 150:
            logger.addToLog("Incorporação para ID de vídeo " + vid + "não foi permitido.");
            logger.addToLog("Por favor, considere remover este vídeo da lista de reprodução.");
            break;
        default:
            logger.addToLog("Ocorreu um erro desconhecido ao jogar: " + vid);
    }

    skip();
}

function skip()
{
    musicIndex++;
    play();
}

function play() 
{
    title = "";

    var idx = musicIndex % config.music.length;
    var videoId = config.music[idx];
    
    player.loadVideoById(videoId, 0, "tiny");
    player.playVideo();
}

function resume()
{
    player.playVideo();
}

function pause() 
{
    player.pauseVideo();
}

function stop() 
{
    player.stopVideo();
}

function setVolume(volume)
{
    player.setVolume(volume)
}