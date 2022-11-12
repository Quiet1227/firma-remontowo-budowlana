let klick = false;
let lklick = 0;
let active = false;
let menumedia = false;
let list = document.getElementsByTagName("ol");
let nav = document.getElementsByTagName("nav");
let a = document.getElementsByTagName("a");
function klikniecie() {
    klick = true;
    lklick = lklick + 1;
    if(!(lklick % 2 == 0)){
        active = true;
        // console.log(active);
    }else{
        active = false;
        // console.log(active);
    }
}
function resetklick(){
    lklick = 0;
	klick = false;
	active = false;
	menu();
}
document.getElementById('ham').addEventListener('click', klikniecie);
function reseta(){
	if(window.innerWidth<=500 == true){
		if(active == true){
			a[0].setAttribute("onclick", "resetklick()");
			a[1].setAttribute("onclick", "resetklick()");
			a[2].setAttribute("onclick", "resetklick()");
			a[3].setAttribute("onclick", "resetklick()");
		}else{
			a[0].removeAttribute("onclick", "resetklick()");
			a[1].removeAttribute("onclick", "resetklick()");
			a[2].removeAttribute("onclick", "resetklick()");
			a[3].removeAttribute("onclick", "resetklick()");
		}
	}
}
function szerokosc(){
    if(window.innerWidth<=1456){
        menumedia = true;
        // console.log(menumedia);
    }else{
        menumedia = false;
        // console.log(menumedia);
    }
    if(menumedia == false){
        list[0].style.visibility="visible";
        nav[0].classList.remove('active');
        active = false;
        lklick = 0;
    }else if(menumedia == true && active == true){
        list[0].style.visibility="visible";
        nav[0].classList.add('active');
    }else{
        list[0].style.visibility="hidden";
    }
	reseta();
}
addEventListener('resize', szerokosc);
function menu() {
    if(active == true){
        list[0].style.visibility="visible";
        nav[0].classList.add('active');
    }else{
        list[0].style.visibility="hidden";
        nav[0].classList.remove('active');
    }
	reseta();
}
document.getElementById('ham').addEventListener('click', menu);
function scrollowanie() {
    let pasek = document.getElementById('pasek');
    let remulti = document.getElementById('remulti');
    let glowna = document.getElementById('glowna');
    let scroll = window.scrollY+pasek.clientHeight+2;
    if (scroll < glowna.clientHeight){
        pasek.classList.remove('kolor');
        remulti.classList.add('hide');
    }else{
        pasek.classList.add('kolor');
        remulti.classList.remove('hide');
    }
}
window.addEventListener('scroll', scrollowanie);
fetch('https://www.oferteo.pl/remulti-damian-serwinski/firma/5760453')
    .then(function(response) {
        return response.text()
    })
    .then(function(html) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");
        var opis = doc.querySelectorAll('p.word-break')[0].innerHTML;
        let zdj = doc.querySelectorAll('span.avatarBusinessCard')[0].style.backgroundImage;
        let mainart = document.getElementById('o_nas');
        var elemt = document.getElementById('o_nas').children;
        let oceny = doc.getElementById('gen-marks');
        // console.log(oceny);
        // console.log(opis);
        // console.log(zdj);
        var i = 0;
        var t = 1000;
        function animacja(){
            if(window.scrollY+18 >= mainart.clientHeight){
                if (i < opis.length) {
                    if(opis.charAt(i) == '<'  && opis.charAt(i+3) == '>'){
                        t = 0;
                        elemt[1].innerHTML += '<br>';
                        t = 100;
                        i = i+4;
                    }
                    if(opis.charAt(i) == ','){
                        t = t-10;
                    }
                    elemt[1].innerHTML += opis.charAt(i);
                    // console.log(opis.charAt(i)+i);
                    i++;
                    setTimeout(animacja,t);
                }
            }
        }
        addEventListener('scroll',animacja);
        
        elemt[0].style.backgroundImage = zdj;
        document.getElementById('holder').innerHTML += oceny.innerHTML;

    })
    .catch(error => console.log('Błąd z wczytaniem danych'));
