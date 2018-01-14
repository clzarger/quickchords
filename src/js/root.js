const temp = require('./temp');
const PDFDocument = require('pdfkit');
const blobStream = require('blob-stream');
const fs = require('fs');

// CHORDS DOWNLOADER
window.chords = function () {
    var filename = 'Chords';
    // <!---inputs-->
    var chordsOne = document.getElementById("chords1").value;
    var chordsTwo = document.getElementById("chords2").value;
    var chordsThree = document.getElementById("chords3").value;
    var titleOne = document.getElementById("name1").value;
    var titleTwo = document.getElementById("name2").value;
    var titleThree = document.getElementById("name3").value;

    // <!---reformat-->


    // PAGE ONE
    var doc = new PDFDocument(
      {
        layout: 'landscape'
      }
    );
    window.stream = doc.pipe(blobStream());
    doc.font('Courier');

    // PAGE ONE
    doc.fontSize (14);
    doc.text(titleOne, {
      align: 'left',
      columns: 2,
    });
    doc.moveDown();
    doc.fontSize (12);
    doc.text(chordsOne, {
      align: 'left',
      columns: 2,
    });


    // PAGE two
    doc.addPage({
      layout: 'landscape'
    });
    doc.fontSize (14);
    doc.text(titleTwo, {
      align: 'left',
      columns: 2,
    });
    doc.moveDown();
    doc.fontSize (12);
    doc.text(chordsTwo, {
      align: 'left',
      columns: 2,
    });


    // PAGE THREE
    doc.addPage({
      layout: 'landscape'
    });
    doc.fontSize (14);
    doc.text(titleThree, {
      align: 'left',
      columns: 2,

    });
    doc.moveDown();
    doc.fontSize (12);
    doc.text(chordsThree, {
      align: 'left',
      columns: 2,
    });


    doc.end();
    stream.on('finish', function () {
    // <!---downloader-->
    var pom = document.createElement('a');
    pom.setAttribute('href', stream.toBlobURL('application/pdf'));
    pom.setAttribute('download', filename);
    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
  })
};


// SLIDES BUTTON
window.slides = function () {
    var filename = 'Slides';
    // inputs
    var title1 = document.getElementById("name1").value;
    var chordsInput1 = document.getElementById("chords1").value;

    var title2 = document.getElementById("name2").value;
    var chordsInput2 = document.getElementById("chords2").value;

    var title3 = document.getElementById("name3").value;
    var chordsInput3 = document.getElementById("chords3").value;

    //reformat!!!!!!!!!!!!!!

    //SONG ONE!!!!!!!!!!!!
    //remove chords
    var one1 = chordsInput1.replace(/Am\s|A\s|A#\s|A\/G|Bm\s|C\s|Dsus|G\s|E\s|Em\s|Em7\s|D\s|Dm\s|F\s|Cadd2|Cadd9|G\/D|D\/F#|G\/B|Dsus4|Am7|-|Am\/G|C\/E/g,"");
    var two1 = one1.replace(/^\s*[\r\n]*/gm,"");
    //var two = three.replace(/\[Intro]\n\s/,"");
    //find where to split slides
    var slideOneStart1 = two1.indexOf("[");
    var slideTwoStart1 = two1.indexOf("[",slideOneStart1+1);
    var slideThreeStart1 = two1.indexOf("[",slideTwoStart1+1);
    var slideFourStart1 = two1.indexOf("[",slideThreeStart1+1);
    var slideFiveStart1 = two1.indexOf("[",slideFourStart1+1);
    var slideSixStart1 = two1.indexOf("[",slideFiveStart1+1);
    var slideSevenStart1 = two1.indexOf("[",slideSixStart1+1);
    var slideEightStart1 = two1.indexOf("[",slideSevenStart1+1);
    var slideNineStart1 = two1.indexOf("[",slideEightStart1+1);
    //split slides
    var slideOnePre1 = two1.slice(slideOneStart1,slideTwoStart1);
    var slideTwoPre1 = two1.slice(slideTwoStart1,slideThreeStart1);
    var slideThreePre1 = two1.slice(slideThreeStart1,slideFourStart1);
    var slideFourPre1 = two1.slice(slideFourStart1,slideFiveStart1);
    var slideFivePre1 = two1.slice(slideFiveStart1,slideSixStart1);
    var slideSixPre1 = two1.slice(slideSixStart1,slideSevenStart1);
    var slideSevenPre1 = two1.slice(slideSevenStart1,slideEightStart1);
    var slideEightPre1 = two1.slice(slideEightStart1,slideNineStart1);
    //remove verse & chorus headers
    var slideOne1 = slideOnePre1.replace(/\[.*\]/g,"");
    var slideTwo1 = slideTwoPre1.replace(/\[.*\]/g,"");
    var slideThree1 = slideThreePre1.replace(/\[.*\]/g,"");
    var slideFour1 = slideFourPre1.replace(/\[.*\]/g,"");
    var slideFive1 = slideFivePre1.replace(/\[.*\]/g,"");
    var slideSix1 = slideSixPre1.replace(/\[.*\]/g,"");
    var slideSeven1 = slideSevenPre1.replace(/\[.*\]/g,"");
    var slideEight1 = slideEightPre1.replace(/\[.*\]/g,"");


    //SONG TWO!!!!!!!!!!!

    //remove chords
    var one2 = chordsInput2.replace(/Am\s|A\s|A#\s|Bm\s|C\s|Dsus|G\s|E\s|Em\s|Em7\s|D\s|Dm\s|F\s|Cadd2|Cadd9|G\/D|D\/F#|G\/B|Dsus4|Am7|-|Am\/G|C\/E/g,"");
    var two2 = one2.replace(/^\s*[\r\n]*/gm,"");
    //var two = three.replace(/\[Intro]\n\s/,"");
    //find where to split slides
    var slideOneStart2 = two2.indexOf("[");
    var slideTwoStart2 = two2.indexOf("[",slideOneStart2+1);
    var slideThreeStart2 = two2.indexOf("[",slideTwoStart2+1);
    var slideFourStart2 = two2.indexOf("[",slideThreeStart2+1);
    var slideFiveStart2 = two2.indexOf("[",slideFourStart2+1);
    var slideSixStart2 = two2.indexOf("[",slideFiveStart2+1);
    var slideSevenStart2 = two2.indexOf("[",slideSixStart2+1);
    var slideEightStart2 = two2.indexOf("[",slideSevenStart2+1);
    var slideNineStart2 = two2.indexOf("[",slideEightStart2+1);
    //split slides
    var slideOnePre2 = two2.slice(slideOneStart2,slideTwoStart2);
    var slideTwoPre2 = two2.slice(slideTwoStart2,slideThreeStart2);
    var slideThreePre2 = two2.slice(slideThreeStart2,slideFourStart2);
    var slideFourPre2 = two2.slice(slideFourStart2,slideFiveStart2);
    var slideFivePre2 = two2.slice(slideFiveStart2,slideSixStart2);
    var slideSixPre2 = two2.slice(slideSixStart2,slideSevenStart2);
    var slideSevenPre2 = two2.slice(slideSevenStart2,slideEightStart2);
    var slideEightPre2 = two2.slice(slideEightStart2,slideNineStart2);
    //remove verse & chorus headers
    var slideOne2 = slideOnePre2.replace(/\[.*\]/g,"");
    var slideTwo2 = slideTwoPre2.replace(/\[.*\]/g,"");
    var slideThree2 = slideThreePre2.replace(/\[.*\]/g,"");
    var slideFour2 = slideFourPre2.replace(/\[.*\]/g,"");
    var slideFive2 = slideFivePre2.replace(/\[.*\]/g,"");
    var slideSix2 = slideSixPre2.replace(/\[.*\]/g,"");
    var slideSeven2 = slideSevenPre2.replace(/\[.*\]/g,"");
    var slideEight2 = slideEightPre2.replace(/\[.*\]/g,"");



    //SONG THREE!!!!!!!!!!!

    //remove chords
    var one3 = chordsInput3.replace(/Am\s|A\s|A#\s|Bm\s|C\s|Dsus|G\s|E\s|Em\s|Em7\s|D\s|Dm\s|F\s|Cadd2|Cadd9|G\/D|D\/F#|G\/B|Dsus4|Am7|-|Am\/G|C\/E/g,"");
    var two3 = one3.replace(/^\s*[\r\n]*/gm,"");
    //var two = three.replace(/\[Intro]\n\s/,"");
    //find where to split slides
    var slideOneStart3 = two3.indexOf("[");
    var slideTwoStart3 = two3.indexOf("[",slideOneStart3+1);
    var slideThreeStart3 = two3.indexOf("[",slideTwoStart3+1);
    var slideFourStart3 = two3.indexOf("[",slideThreeStart3+1);
    var slideFiveStart3 = two3.indexOf("[",slideFourStart3+1);
    var slideSixStart3 = two3.indexOf("[",slideFiveStart3+1);
    var slideSevenStart3 = two3.indexOf("[",slideSixStart3+1);
    var slideEightStart3 = two3.indexOf("[",slideSevenStart3+1);
    var slideNineStart3 = two3.indexOf("[",slideEightStart3+1);
    //split slides
    var slideOnePre3 = two3.slice(slideOneStart3,slideTwoStart3);
    var slideTwoPre3 = two3.slice(slideTwoStart3,slideThreeStart3);
    var slideThreePre3 = two3.slice(slideThreeStart3,slideFourStart3);
    var slideFourPre3 = two3.slice(slideFourStart3,slideFiveStart3);
    var slideFivePre3 = two3.slice(slideFiveStart3,slideSixStart3);
    var slideSixPre3 = two3.slice(slideSixStart3,slideSevenStart3);
    var slideSevenPre3 = two3.slice(slideSevenStart3,slideEightStart3);
    var slideEightPre3 = two3.slice(slideEightStart3,slideNineStart3);
    //remove verse & chorus headers
    var slideOne3 = slideOnePre3.replace(/\[.*\]/g,"");
    var slideTwo3 = slideTwoPre3.replace(/\[.*\]/g,"");
    var slideThree3 = slideThreePre3.replace(/\[.*\]/g,"");
    var slideFour3 = slideFourPre3.replace(/\[.*\]/g,"");
    var slideFive3 = slideFivePre3.replace(/\[.*\]/g,"");
    var slideSix3 = slideSixPre3.replace(/\[.*\]/g,"");
    var slideSeven3 = slideSevenPre3.replace(/\[.*\]/g,"");
    var slideEight3 = slideEightPre3.replace(/\[.*\]/g,"");



    // page one
    var doc = new PDFDocument(
      {
        layout: 'landscape'
      }
    );
    window.stream = doc.pipe(blobStream());
    doc.font('Helvetica');
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");

    //title slide
    doc.fontSize(40).fillColor('white');
    doc.moveDown(4);
    doc.text(title1, {
      align: 'center',
    });


    //song one, slide one
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideOne1, {
      align: 'center',
    });

    //song one, slide two
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideTwo1, {
      align: 'center',
    });

    //song one, slide three
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideThree1, {
      align: 'center',
    });

    //song one, slide four
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideFour1, {
      align: 'center',
    });

    //song one, slide five
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideFive1, {
      align: 'center',
    });

    //song one, slide six
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideSix1, {
      align: 'center',
    });

    //song one, slide seven
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideSeven1, {
      align: 'center',
    });

    //song one, slide eight
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideEight1, {
      align: 'center',
    });

    //SONG TWO!!!!!!!!

    //song two title
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(40).fillColor('white');
    doc.moveDown(4)
    doc.text(title2, {
      align: 'center',
    });

    //song one, slide one
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideOne2, {
      align: 'center',
    });

    //song one, slide two
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideTwo2, {
      align: 'center',
    });

    //song one, slide three
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideThree2, {
      align: 'center',
    });

    //song one, slide four
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideFour2, {
      align: 'center',
    });

    //song one, slide five
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideFive2, {
      align: 'center',
    });

    //song one, slide six
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideSix2, {
      align: 'center',
    });

    //song one, slide seven
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideSeven2, {
      align: 'center',
    });

    //song one, slide eight
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideEight2, {
      align: 'center',
    });



    //SONG THREE!!!!!!!!

    //song two title
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(40).fillColor('white');
    doc.moveDown(4)
    doc.text(title3, {
      align: 'center',
    });

    //song one, slide one
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideOne3, {
      align: 'center',
    });

    //song one, slide two
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideTwo3, {
      align: 'center',
    });

    //song one, slide three
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideThree3, {
      align: 'center',
    });

    //song one, slide four
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideFour3, {
      align: 'center',
    });

    //song one, slide five
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideFive3, {
      align: 'center',
    });

    //song one, slide six
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideSix3, {
      align: 'center',
    });

    //song one, slide seven
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideSeven3, {
      align: 'center',
    });

    //song one, slide eight
    doc.addPage();
    doc.rect(0,0,800,800);
    doc.fillAndStroke("black","#100");
    doc.fontSize(30).fillColor('white');
    doc.text(slideEight3, {
      align: 'center',
    });






    doc.end();
    stream.on('finish', function () {
    // <!---downloader-->
    var pom = document.createElement('a');
    pom.setAttribute('href', stream.toBlobURL('application/pdf'));
    pom.setAttribute('download', filename);
    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
  })
};


window.phone = function () {
  var pptx = require('pptxgenjs');
  var pptx1 = new pptx.constructor();
  var slide = pptx1.addNewSlide();
  slide.addText('Hello World!', { x:1.5, y:1.5, font_size:18, color:'363636' });
  pptx.save('Sample Presentation');

  console.log(28);
};
