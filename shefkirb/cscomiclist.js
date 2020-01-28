var comicsrcs = [
"https://shefwerld.github.io/shefkirb/comics/media/apple/1.png",
"https://shefwerld.github.io/shefkirb/comics/media/apple/2.png",
"https://shefwerld.github.io/shefkirb/comics/media/apple/3.png",
"https://shefwerld.github.io/shefkirb/comics/media/apple/4.png",
"https://shefwerld.github.io/shefkirb/comics/media/apple/5.png",
"https://shefwerld.github.io/shefkirb/comics/media/apple/6.png",
"https://shefwerld.github.io/shefkirb/comics/media/apple/7.png",
"https://shefwerld.github.io/shefkirb/comics/media/apple/8.png",
"https://shefwerld.github.io/shefkirb/comics/media/apple/9.png",
"https://shefwerld.github.io/shefkirb/comics/media/apple/10.png",
"https://shefwerld.github.io/shefkirb/comics/media/apple/11.png",
"https://shefwerld.github.io/shefkirb/comics/media/apple/12.png",
"https://shefwerld.github.io/shefkirb/comics/media/apple/13a.png",
"https://shefwerld.github.io/shefkirb/comics/media/apple/14.png",
"https://shefwerld.github.io/shefkirb/comics/media/apple/15.png",
"https://shefwerld.github.io/shefkirb/comics/media/apple/16.png",
"https://shefwerld.github.io/shefkirb/comics/media/apple/17.png",
"https://shefwerld.github.io/shefkirb/comics/media/apple/18.png",
"https://shefwerld.github.io/shefkirb/comics/media/apple/19.png",
"https://shefwerld.github.io/shefkirb/comics/media/apple/20.png",
"https://shefwerld.github.io/shefkirb/comics/media/apple/21.png",
"https://shefwerld.github.io/shefkirb/comics/media/apple/22.png",
"https://shefwerld.github.io/shefkirb/comics/media/apple/23.png"];
var comicnames = [
"No Arms",
"Philosophy Vs. Dinosaurs",
"Confession",
"Dab Day",
"The Sun",
"Creative Drought",
"Apple's Hearty Christmas Twinkies",
"Dr. Bach Mann",
"Why You So Serious?",
"Cookies",
"Snopes",
"Gullible",
"ERROR!! uh oh",
"Border Control",
"Smoking",
"Anniversary Edition",
"Hopsital",
"Gullible 2",
"Therapist",
"Your Head",
"Female",
"Merry Christmas",
"Vegan"];
if (Math.round(Math.random()) == 1) {
	comicnames[12]="Yanny";
	comicsrcs[12]="https://shefwerld.github.io/shefkirb/comics/media/apple/13a.png";
} else {
	comicnames[12]="Laurel"
	comicsrcs[12]="https://shefwerld.github.io/shefkirb/comics/media/apple/13b.png";
}

function callComic(number) {
	number = number - 1;
	loadComic(number);
}
