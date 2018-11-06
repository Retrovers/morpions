$( document ).ready(function() {

    // CONSTANTE
    const AllTabs = ".tab1, .tab2, .tab3, .tab4, .tab5, .tab6, .tab7, .tab8, .tab9"
    const MessageDiv = ".messages"
    const PlayersSymboles = ['X', 'O']
    const RestartButton = "#restart"
    const TabsDiv = ".tabs"
    const AudioClick = new Audio('assets/sounds/Click.wav')
    const AudioWin = new Audio('assets/sounds/Win.wav')
    const AudioLoose = new Audio('assets/sounds/Loose.wav')
    const soundEnableImage = "assets/images/soundEnable.svg"
    const soundDisableImage = "assets/images/soundDisable.svg"
    var AllTabsSelected = []
    var isSoundEnable = true
    var nextPlayer
    var Players
    
    function getRandomInt(max){
        return Math.floor(Math.random() * Math.floor(max))
    }

    function animFadeTabs(){
        $(".tabs").fadeTo("slow", 0.6, function(){
            $(".tabs").css('opacity', 1)
        })
    }

    $(AllTabs).click(function(e){
        newClick(e)
    })

    $(".soundOption").click(function(e){
        changeSoundStatus()
    })

    $(RestartButton).click(function(e){
        restartGame()
    })

    $(".back").click(function(e) {
        document.location.href = "index.html"  
    })

    function changeSoundStatus() {
        if (isSoundEnable){
            $(".soundOption").attr('src', soundDisableImage)
            isSoundEnable = false
            Cookies.set('soundOption', 'false')
        } else {
            $(".soundOption").attr('src', soundEnableImage)
            isSoundEnable = true
            Cookies.set('soundOption', 'true')
        }
    }

    function tirageAuSort(){
        nextPlayer = getRandomInt(2) + 2;
    }

    function getTabsValue(){
        Tabs = []
        for (i = 0; i <= 9; i++){
            Tabs.push($('.tab' + i).text())
        }
        return Tabs
    }

    function checkTripleSymbole(){
        TabsVal = getTabsValue()
        console.log(TabsVal)
        if(TabsVal[1] != ""){
            console.log("verif 1")
            if (TabsVal[1] == TabsVal[2] && TabsVal[2] == TabsVal[3]){
                console.log(1)
                return true
            } else if (TabsVal[1] == TabsVal[4] && TabsVal[4] == TabsVal[7]){
                console.log(6)
                return true
            }  else if (TabsVal[1] == TabsVal[5] && TabsVal[5] == TabsVal[9]){
                console.log(4)
                return true
            }        
        }  
        if (TabsVal[5] != ""){
            console.log("verif 5")
            if (TabsVal[4] == TabsVal[5] && TabsVal[5] == TabsVal[6]){
                console.log(2)
                return true
            } else if (TabsVal[3] == TabsVal[5] && TabsVal[5] == TabsVal[7]){
                console.log(5)
                return true
            } else if (TabsVal[2] == TabsVal[5] && TabsVal[5] == TabsVal[8]){
                console.log(7)
                return true
            }    
        } 
        if (TabsVal[9] != ""){
            console.log("verif 9")
            if (TabsVal[7] == TabsVal[8] && TabsVal[8] == TabsVal[9]){
                console.log(3)
                return true
            } else if (TabsVal[3] == TabsVal[6] && TabsVal[6] == TabsVal[9]){
                console.log(8)
                return true
            }   
        }
        return false
    }

    function playSound(type){
        if (isSoundEnable){
            switch (type) {
                case 'click':
                    AudioClick.play()
                    break;
                case 'win' :
                    AudioWin.play()
                    break;
                case 'loose':
                    AudioLoose.play()
                    break;    
            }
        }
    }

    function finishGame(){
        playSound('win')
        WriteMessage("<b>"+ Players[nextPlayer%2] + "</b> A gagné(e) !<br>Que voulez vous faire ?")
        $(RestartButton).css('display', 'block')
        $(TabsDiv).css('display', 'none')
    }

    function newClick(e){
        if (checkBoxAlreadySelected(e)){
            WriteMessage("<b>"+ Players[nextPlayer%2] + "</b>,<br>selectionnez une case non utlisé")
        } else {
            makeSelectedBox(e.toElement, getPlayerSymbole(nextPlayer%2))
            checkGameStatus()
        }
    }

    function checkGameStatus(){
        if (AllTabsSelected.length >= 5 && checkTripleSymbole()){
            finishGame()
        } else if (AllTabsSelected.length == 9){
            playSound('loose')
            WriteMessage("Partie perdue ! On refait,<br>A <b>" + Players[nextPlayer%2] + "</b> de jouer !")
            restartGame()
        } else {
            ++nextPlayer
            WriteMessage("Maintenant a <b>" + Players[nextPlayer%2] + "</b><br>De jouer !")
        }
    }

    function getPlayerSymbole(id){
        return PlayersSymboles[id]
    }

    function WriteMessage(m){
        $(MessageDiv).html(m)
    }

    function makeSelectedBox(e, Caract){
        playSound('click')
        AllTabsSelected.push(e.className)
        $(e).text(Caract).addClass("selected")
    }

    function restartGame(){
        $(".tabs").css('opacity', 0)
        $(TabsDiv).css('display', 'block')
        $(RestartButton).css('display', 'none')
        $(AllTabs).text("")
        AllTabsSelected = []
        PlayersTabSelectMap = new Map();
        $(AllTabs).removeClass("selected")
        animFadeTabs()
    }

    function checkBoxAlreadySelected(e){
        return e.toElement.className.includes("selected")
    }

    function startGame(){
        if (Cookies.get('soundOption') != undefined) {isSoundEnable = Cookies.get('soundOption')}
        $(AllTabs).text("")
        tirageAuSort()
        PlayersTabSelectMap = new Map();
        WriteMessage("Le tirage au sort a été fait !<br><b>"+ Players[nextPlayer%2] +"</b> a toi de jouer !")
        animFadeTabs()
    }

    function getQueryParams(qs) {
        qs = qs.split("+").join(" ");
        var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;
        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
        return params;
    }

    var $_GET = getQueryParams(document.location.search);
    console.log($_GET)

    if ($_GET['player1Local'] != undefined && $_GET['player2Local'] != undefined){
        Players = [$_GET['player1Local'], $_GET['player2Local']]
        startGame()
    }



});