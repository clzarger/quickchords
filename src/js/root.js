const temp = require('./temp');
const PDFDocument = require('pdfkit');
const blobStream = require('blob-stream');
const axios = require('axios');

function getSong(songName){
  return axios.get('/api/song?name=' + songName)
    .then(function(response){
      console.log(response);
      return response.data.content.text;
    });
}

//TEST
window.scraper = function () {

  var songSearch = document.getElementById("scraper").value;

};
//
// //attempt 1
//
//   ugs.search({
//     query: songSearch,
//     page: 1,
//     type: ['Chords']
//   }, (error, tabs) => {
//     if (error) {
//       console.log(error)
//     } else {
//       console.log('hi');
//     };
//
//
//     let tabUrl = tabs[0]['url']
//     ugs.get(tabUrl, (error, tab) => {
//       if (error) {
//         console.log(error)
//       } else {
//         console.log(tab.content)
//       }
//     })
//
//   });
//
// };


// MUSICIAN CHORDS (PDF) works
window.chords = function () {
    var filename = 'Musician Chords';
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
        layout: 'landscape',
        margin: 25,
      }
    );
    window.stream = doc.pipe(blobStream());
    doc.font('Courier-Bold');

    // PAGE ONE
    doc.fontSize (14);
    doc.text(titleOne, {
      align: 'left',
      columns: 2,
    });
    doc.moveDown();
    doc.font('Courier');
    doc.fontSize (12);
    doc.text(chordsOne, {
      align: 'left',
      columns: 2,
    });

    // PAGE TWO
    doc.addPage({
      layout: 'landscape',
      margin: 25,
    });
    doc.fontSize (14);
    doc.font('Courier-Bold');
    doc.text(titleTwo, {
      align: 'left',
      columns: 2,
    });
    doc.moveDown();
    doc.font('Courier');

    doc.fontSize (12);
    doc.text(chordsTwo, {
      align: 'left',
      columns: 2,
    });


    // PAGE THREE
    doc.addPage({
      layout: 'landscape',
      margin: 25,
    });
    doc.fontSize (14);
    doc.font('Courier-Bold');
    doc.text(titleThree, {
      align: 'left',
      columns: 2,

    });
    doc.moveDown();
    doc.font('Courier');
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

// LYRIC SLIDESHOW (PPT) works
window.slides = function () {
  // inputs
    var title1 = document.getElementById("name1").value;
    getSong(title1).then(function(chordsInput1){
      // var chordsInput1 = document.getElementById("chords1").value;
      var title2 = document.getElementById("name2").value;
      var chordsInput2 = document.getElementById("chords2").value;
      var title3 = document.getElementById("name3").value;
      var chordsInput3 = document.getElementById("chords3").value;

    //SONG ONE!!!!!!!!!!!!

      //remove chords
        var chordsInput1_v2 = chordsInput1.replace(/\b([CDEFGAB](?:b|bb)*(?:#|##|sus|maj|min|aug|m|add)*[\d\/]*(?:[CDEFGAB](?:b|bb)*(?:#|##|sus|maj|min|aug|m|add)*[\d\/]*)*)(?=\s|$)(?!\w)/gm, "");
      //remove blank lines where chords used to be
        var chordsInput1_v3 = chordsInput1_v2.replace(/^\s*[\r\n]*/gm, "");
      //add a marker at the end of the input so the following code can find the last slide
        var chordsInput1_v4 = chordsInput1_v3 + "[";
      //find where to split slides
        var slideOneStart1 = chordsInput1_v4.indexOf("[");
        var slideTwoStart1 = chordsInput1_v4.indexOf("[", slideOneStart1 + 1);
        var slideThreeStart1 = chordsInput1_v4.indexOf("[", slideTwoStart1 + 1);
        var slideFourStart1 = chordsInput1_v4.indexOf("[", slideThreeStart1 + 1);
        var slideFiveStart1 = chordsInput1_v4.indexOf("[", slideFourStart1 + 1);
        var slideSixStart1 = chordsInput1_v4.indexOf("[", slideFiveStart1 + 1);
        var slideSevenStart1 = chordsInput1_v4.indexOf("[", slideSixStart1 + 1);
        var slideEightStart1 = chordsInput1_v4.indexOf("[", slideSevenStart1 + 1);
        var slideNineStart1 = chordsInput1_v4.indexOf("[", slideEightStart1 + 1);
        var slideTenStart1 = chordsInput1_v4.indexOf("[", slideNineStart1 + 1);
        var slideElevenStart1 = chordsInput1_v4.indexOf("[", slideTenStart1 + 1);
        var slideTwelveStart1 = chordsInput1_v4.indexOf("[", slideElevenStart1 + 1);
        var slideThirteenStart1 = chordsInput1_v4.indexOf("[", slideTwelveStart1 + 1);
      //prevent error where it prints duplicate slides
         if (slideThreeStart1<0) {
           slideFourStart1 = -1
           slideFiveStart1 = -1
           slideSixStart1 = -1
           slideSevenStart1 = -1
           slideEightStart1 = -1
           slideNineStart1 = -1
           slideTenStart1 = -1
           slideElevenStart1 = -1
           slideTwelveStart1 = -1
           slideThirteenStart1 = -1
         }
         if (slideFourStart1<0) {
           slideFiveStart1 = -1
           slideSixStart1 = -1
           slideSevenStart1 = -1
           slideEightStart1 = -1
           slideNineStart1 = -1
           slideTenStart1 = -1
           slideElevenStart1 = -1
           slideTwelveStart1 = -1
           slideThirteenStart1 = -1
         }
         if (slideFiveStart1<0) {
           slideSixStart1 = -1
           slideSevenStart1 = -1
           slideEightStart1 = -1
           slideNineStart1 = -1
           slideTenStart1 = -1
           slideElevenStart1 = -1
           slideTwelveStart1 = -1
           slideThirteenStart1 = -1
         }
         if (slideSixStart1<0) {
           slideSevenStart1 = -1
           slideEightStart1 = -1
           slideNineStart1 = -1
           slideTenStart1 = -1
           slideElevenStart1 = -1
           slideTwelveStart1 = -1
           slideThirteenStart1 = -1
         }
         if (slideSevenStart1<0) {
           slideEightStart1 = -1
           slideNineStart1 = -1
           slideTenStart1 = -1
           slideElevenStart1 = -1
           slideTwelveStart1 = -1
           slideThirteenStart1 = -1
         }
         if (slideEightStart1<0) {
           slideNineStart1 = -1
           slideTenStart1 = -1
           slideElevenStart1 = -1
           slideTwelveStart1 = -1
           slideThirteenStart1 = -1
         }
         if (slideNineStart1<0) {
           slideTenStart1 = -1
           slideElevenStart1 = -1
           slideTwelveStart1 = -1
           slideThirteenStart1 = -1
         }
         if (slideTenStart1<0) {
           slideElevenStart1 = -1
           slideTwelveStart1 = -1
           slideThirteenStart1 = -1
         }
         if (slideElevenStart1<0) {
           slideTwelveStart1 = -1
           slideThirteenStart1 = -1
         }
         if (slideTwelveStart1<0) {
           slideThirteenStart1 = -1
         }

      //split slides
        var slideOneIsolated1 = chordsInput1_v4.slice(slideOneStart1, slideTwoStart1);
        var slideTwoIsolated1 = chordsInput1_v4.slice(slideTwoStart1, slideThreeStart1);
        var slideThreeIsolated1 = chordsInput1_v4.slice(slideThreeStart1, slideFourStart1);
        var slideFourIsolated1 = chordsInput1_v4.slice(slideFourStart1, slideFiveStart1);
        var slideFiveIsolated1 = chordsInput1_v4.slice(slideFiveStart1, slideSixStart1);
        var slideSixIsolated1 = chordsInput1_v4.slice(slideSixStart1, slideSevenStart1);
        var slideSevenIsolated1 = chordsInput1_v4.slice(slideSevenStart1, slideEightStart1);
        var slideEightIsolated1 = chordsInput1_v4.slice(slideEightStart1, slideNineStart1);
        var slideNineIsolated1 = chordsInput1_v4.slice(slideNineStart1, slideTenStart1);
        var slideTenIsolated1 = chordsInput1_v4.slice(slideTenStart1, slideElevenStart1);
        var slideElevenIsolated1 = chordsInput1_v4.slice(slideElevenStart1, slideTwelveStart1);
        var slideTwelveIsolated1 = chordsInput1_v4.slice(slideTwelveStart1, slideThirteenStart1);
      //remove verse & chorus headers
        var slideOneNeedsTrimmed1 = slideOneIsolated1.replace(/\[.*\]/g, "");
        var slideTwoNeedsTrimmed1 = slideTwoIsolated1.replace(/\[.*\]/g, "");
        var slideThreeNeedsTrimmed1 = slideThreeIsolated1.replace(/\[.*\]/g, "");
        var slideFourNeedsTrimmed1 = slideFourIsolated1.replace(/\[.*\]/g, "");
        var slideFiveNeedsTrimmed1 = slideFiveIsolated1.replace(/\[.*\]/g, "");
        var slideSixNeedsTrimmed1 = slideSixIsolated1.replace(/\[.*\]/g, "");
        var slideSevenNeedsTrimmed1 = slideSevenIsolated1.replace(/\[.*\]/g, "");
        var slideEightNeedsTrimmed1 = slideEightIsolated1.replace(/\[.*\]/g, "");
        var slideNineNeedsTrimmed1 = slideNineIsolated1.replace(/\[.*\]/g, "");
        var slideTenNeedsTrimmed1 = slideTenIsolated1.replace(/\[.*\]/g, "");
        var slideElevenNeedsTrimmed1 = slideElevenIsolated1.replace(/\[.*\]/g, "");
        var slideTwelveNeedsTrimmed1 = slideTwelveIsolated1.replace(/\[.*\]/g, "");
      //trim white space
        var slideOne1 = slideOneNeedsTrimmed1.trim();
        var slideTwo1 = slideTwoNeedsTrimmed1.trim();
        var slideThree1 = slideThreeNeedsTrimmed1.trim();
        var slideFour1 = slideFourNeedsTrimmed1.trim();
        var slideFive1 = slideFiveNeedsTrimmed1.trim();
        var slideSix1 = slideSixNeedsTrimmed1.trim();
        var slideSeven1 = slideSevenNeedsTrimmed1.trim();
        var slideEight1 = slideEightNeedsTrimmed1.trim();
        var slideNine1 = slideNineNeedsTrimmed1.trim();
        var slideTen1 = slideTenNeedsTrimmed1.trim();
        var slideEleven1 = slideElevenNeedsTrimmed1.trim();
        var slideTwelve1 = slideTwelveNeedsTrimmed1.trim();

    //SONG TWO!!!!!!!!!!!

    //remove chords
      var chordsInput2_v2 = chordsInput2.replace(/\b([CDEFGAB](?:b|bb)*(?:#|##|sus|maj|min|aug|m|add)*[\d\/]*(?:[CDEFGAB](?:b|bb)*(?:#|##|sus|maj|min|aug|m|add)*[\d\/]*)*)(?=\s|$)(?!\w)/gm, "");
    //remove blank lines where chords used to be
      var chordsInput2_v3 = chordsInput2_v2.replace(/^\s*[\r\n]*/gm, "");
    //add a marker at the end of the input so the following code can find the last slide
      var chordsInput2_v4 = chordsInput2_v3 + "[";
    //find where to split slides
      var slideOneStart2 = chordsInput2_v4.indexOf("[");
      var slideTwoStart2 = chordsInput2_v4.indexOf("[", slideOneStart2 + 1);
      var slideThreeStart2 = chordsInput2_v4.indexOf("[", slideTwoStart2 + 1);
      var slideFourStart2 = chordsInput2_v4.indexOf("[", slideThreeStart2 + 1);
      var slideFiveStart2 = chordsInput2_v4.indexOf("[", slideFourStart2 + 1);
      var slideSixStart2 = chordsInput2_v4.indexOf("[", slideFiveStart2 + 1);
      var slideSevenStart2 = chordsInput2_v4.indexOf("[", slideSixStart2 + 1);
      var slideEightStart2 = chordsInput2_v4.indexOf("[", slideSevenStart2 + 1);
      var slideNineStart2 = chordsInput2_v4.indexOf("[", slideEightStart2 + 1);
      var slideTenStart2 = chordsInput2_v4.indexOf("[", slideNineStart2 + 1);
      var slideElevenStart2 = chordsInput2_v4.indexOf("[", slideTenStart2 + 1);
      var slideTwelveStart2 = chordsInput2_v4.indexOf("[", slideElevenStart2 + 1);
      var slideThirteenStart2 = chordsInput2_v4.indexOf("[", slideTwelveStart2 + 1);
    //prevent error where it prints duplicate slides
       if (slideThreeStart2<0) {
         slideFourStart2 = -1
         slideFiveStart2 = -1
         slideSixStart2 = -1
         slideSevenStart2 = -1
         slideEightStart2 = -1
         slideNineStart2 = -1
         slideTenStart2 = -1
         slideElevenStart2 = -1
         slideTwelveStart2 = -1
         slideThirteenStart2 = -1
       }
       if (slideFourStart2<0) {
         slideFiveStart2 = -1
         slideSixStart2 = -1
         slideSevenStart2 = -1
         slideEightStart2 = -1
         slideNineStart2 = -1
         slideTenStart2 = -1
         slideElevenStart2 = -1
         slideTwelveStart2 = -1
         slideThirteenStart2 = -1
       }
       if (slideFiveStart2<0) {
         slideSixStart2 = -1
         slideSevenStart2 = -1
         slideEightStart2 = -1
         slideNineStart2 = -1
         slideTenStart2 = -1
         slideElevenStart2 = -1
         slideTwelveStart2 = -1
         slideThirteenStart2 = -1
       }
       if (slideSixStart2<0) {
         slideSevenStart2 = -1
         slideEightStart2 = -1
         slideNineStart2 = -1
         slideTenStart2 = -1
         slideElevenStart2 = -1
         slideTwelveStart2 = -1
         slideThirteenStart2 = -1
       }
       if (slideSevenStart2<0) {
         slideEightStart2 = -1
         slideNineStart2 = -1
         slideTenStart2 = -1
         slideElevenStart2 = -1
         slideTwelveStart2 = -1
         slideThirteenStart2 = -1
       }
       if (slideEightStart2<0) {
         slideNineStart2 = -1
         slideTenStart2 = -1
         slideElevenStart2 = -1
         slideTwelveStart2 = -1
         slideThirteenStart2 = -1
       }
       if (slideNineStart2<0) {
         slideTenStart2 = -1
         slideElevenStart2 = -1
         slideTwelveStart2 = -1
         slideThirteenStart2 = -1
       }
       if (slideTenStart2<0) {
         slideElevenStart2 = -1
         slideTwelveStart2 = -1
         slideThirteenStart2 = -1
       }
       if (slideElevenStart2<0) {
         slideTwelveStart2 = -1
         slideThirteenStart2 = -1
       }
       if (slideTwelveStart2<0) {
         slideThirteenStart2 = -1
       }

    //split slides
      var slideOneIsolated2 = chordsInput2_v4.slice(slideOneStart2, slideTwoStart2);
      var slideTwoIsolated2 = chordsInput2_v4.slice(slideTwoStart2, slideThreeStart2);
      var slideThreeIsolated2 = chordsInput2_v4.slice(slideThreeStart2, slideFourStart2);
      var slideFourIsolated2 = chordsInput2_v4.slice(slideFourStart2, slideFiveStart2);
      var slideFiveIsolated2 = chordsInput2_v4.slice(slideFiveStart2, slideSixStart2);
      var slideSixIsolated2 = chordsInput2_v4.slice(slideSixStart2, slideSevenStart2);
      var slideSevenIsolated2 = chordsInput2_v4.slice(slideSevenStart2, slideEightStart2);
      var slideEightIsolated2 = chordsInput2_v4.slice(slideEightStart2, slideNineStart2);
      var slideNineIsolated2 = chordsInput2_v4.slice(slideNineStart2, slideTenStart2);
      var slideTenIsolated2 = chordsInput2_v4.slice(slideTenStart2, slideElevenStart2);
      var slideElevenIsolated2 = chordsInput2_v4.slice(slideElevenStart2, slideTwelveStart2);
      var slideTwelveIsolated2 = chordsInput2_v4.slice(slideTwelveStart2, slideThirteenStart2);
    //remove verse & chorus headers
      var slideOneNeedsTrimmed2 = slideOneIsolated2.replace(/\[.*\]/g, "");
      var slideTwoNeedsTrimmed2 = slideTwoIsolated2.replace(/\[.*\]/g, "");
      var slideThreeNeedsTrimmed2 = slideThreeIsolated2.replace(/\[.*\]/g, "");
      var slideFourNeedsTrimmed2 = slideFourIsolated2.replace(/\[.*\]/g, "");
      var slideFiveNeedsTrimmed2 = slideFiveIsolated2.replace(/\[.*\]/g, "");
      var slideSixNeedsTrimmed2 = slideSixIsolated2.replace(/\[.*\]/g, "");
      var slideSevenNeedsTrimmed2 = slideSevenIsolated2.replace(/\[.*\]/g, "");
      var slideEightNeedsTrimmed2 = slideEightIsolated2.replace(/\[.*\]/g, "");
      var slideNineNeedsTrimmed2 = slideNineIsolated2.replace(/\[.*\]/g, "");
      var slideTenNeedsTrimmed2 = slideTenIsolated2.replace(/\[.*\]/g, "");
      var slideElevenNeedsTrimmed2 = slideElevenIsolated2.replace(/\[.*\]/g, "");
      var slideTwelveNeedsTrimmed2 = slideTwelveIsolated2.replace(/\[.*\]/g, "");
    //trim white space
      var slideOne2 = slideOneNeedsTrimmed2.trim();
      var slideTwo2 = slideTwoNeedsTrimmed2.trim();
      var slideThree2 = slideThreeNeedsTrimmed2.trim();
      var slideFour2 = slideFourNeedsTrimmed2.trim();
      var slideFive2 = slideFiveNeedsTrimmed2.trim();
      var slideSix2 = slideSixNeedsTrimmed2.trim();
      var slideSeven2 = slideSevenNeedsTrimmed2.trim();
      var slideEight2 = slideEightNeedsTrimmed2.trim();
      var slideNine2 = slideNineNeedsTrimmed2.trim();
      var slideTen2 = slideTenNeedsTrimmed2.trim();
      var slideEleven2 = slideElevenNeedsTrimmed2.trim();
      var slideTwelve2 = slideTwelveNeedsTrimmed2.trim();



    //SONG THREE!!!!!!!!!!!

    //remove chords
      var chordsInput3_v2 = chordsInput3.replace(/\b([CDEFGAB](?:b|bb)*(?:#|##|sus|maj|min|aug|m|add)*[\d\/]*(?:[CDEFGAB](?:b|bb)*(?:#|##|sus|maj|min|aug|m|add)*[\d\/]*)*)(?=\s|$)(?!\w)/gm, "");
    //remove blank lines where chords used to be
      var chordsInput3_v3 = chordsInput3_v2.replace(/^\s*[\r\n]*/gm, "");
    //add a marker at the end of the input so the following code can find the last slide
      var chordsInput3_v4 = chordsInput3_v3 + "[";
    //find where to split slides
      var slideOneStart3 = chordsInput3_v4.indexOf("[");
      var slideTwoStart3 = chordsInput3_v4.indexOf("[", slideOneStart3 + 1);
      var slideThreeStart3 = chordsInput3_v4.indexOf("[", slideTwoStart3 + 1);
      var slideFourStart3 = chordsInput3_v4.indexOf("[", slideThreeStart3 + 1);
      var slideFiveStart3 = chordsInput3_v4.indexOf("[", slideFourStart3 + 1);
      var slideSixStart3 = chordsInput3_v4.indexOf("[", slideFiveStart3 + 1);
      var slideSevenStart3 = chordsInput3_v4.indexOf("[", slideSixStart3 + 1);
      var slideEightStart3 = chordsInput3_v4.indexOf("[", slideSevenStart3 + 1);
      var slideNineStart3 = chordsInput3_v4.indexOf("[", slideEightStart3 + 1);
      var slideTenStart3 = chordsInput3_v4.indexOf("[", slideNineStart3 + 1);
      var slideElevenStart3 = chordsInput3_v4.indexOf("[", slideTenStart3 + 1);
      var slideTwelveStart3 = chordsInput3_v4.indexOf("[", slideElevenStart3 + 1);
      var slideThirteenStart3 = chordsInput3_v4.indexOf("[", slideTwelveStart3 + 1);
    //prevent error where it prints duplicate slides
       if (slideThreeStart3<0) {
         slideFourStart3 = -1
         slideFiveStart3 = -1
         slideSixStart3 = -1
         slideSevenStart3 = -1
         slideEightStart3 = -1
         slideNineStart3 = -1
         slideTenStart3 = -1
         slideElevenStart3 = -1
         slideTwelveStart3 = -1
         slideThirteenStart3 = -1
       }
       if (slideFourStart3<0) {
         slideFiveStart3 = -1
         slideSixStart3 = -1
         slideSevenStart3 = -1
         slideEightStart3 = -1
         slideNineStart3 = -1
         slideTenStart3 = -1
         slideElevenStart3 = -1
         slideTwelveStart3 = -1
         slideThirteenStart3 = -1
       }
       if (slideFiveStart3<0) {
         slideSixStart3 = -1
         slideSevenStart3 = -1
         slideEightStart3 = -1
         slideNineStart3 = -1
         slideTenStart3 = -1
         slideElevenStart3 = -1
         slideTwelveStart3 = -1
         slideThirteenStart3 = -1
       }
       if (slideSixStart3<0) {
         slideSevenStart3 = -1
         slideEightStart3 = -1
         slideNineStart3 = -1
         slideTenStart3 = -1
         slideElevenStart3 = -1
         slideTwelveStart3 = -1
         slideThirteenStart3 = -1
       }
       if (slideSevenStart3<0) {
         slideEightStart3 = -1
         slideNineStart3 = -1
         slideTenStart3 = -1
         slideElevenStart3 = -1
         slideTwelveStart3 = -1
         slideThirteenStart3 = -1
       }
       if (slideEightStart3<0) {
         slideNineStart3 = -1
         slideTenStart3 = -1
         slideElevenStart3 = -1
         slideTwelveStart3 = -1
         slideThirteenStart3 = -1
       }
       if (slideNineStart3<0) {
         slideTenStart3 = -1
         slideElevenStart3 = -1
         slideTwelveStart3 = -1
         slideThirteenStart3 = -1
       }
       if (slideTenStart3<0) {
         slideElevenStart3 = -1
         slideTwelveStart3 = -1
         slideThirteenStart3 = -1
       }
       if (slideElevenStart3<0) {
         slideTwelveStart3 = -1
         slideThirteenStart3 = -1
       }
       if (slideTwelveStart3<0) {
         slideThirteenStart3 = -1
       }

    //split slides
      var slideOneIsolated3 = chordsInput3_v4.slice(slideOneStart3, slideTwoStart3);
      var slideTwoIsolated3 = chordsInput3_v4.slice(slideTwoStart3, slideThreeStart3);
      var slideThreeIsolated3 = chordsInput3_v4.slice(slideThreeStart3, slideFourStart3);
      var slideFourIsolated3 = chordsInput3_v4.slice(slideFourStart3, slideFiveStart3);
      var slideFiveIsolated3 = chordsInput3_v4.slice(slideFiveStart3, slideSixStart3);
      var slideSixIsolated3 = chordsInput3_v4.slice(slideSixStart3, slideSevenStart3);
      var slideSevenIsolated3 = chordsInput3_v4.slice(slideSevenStart3, slideEightStart3);
      var slideEightIsolated3 = chordsInput3_v4.slice(slideEightStart3, slideNineStart3);
      var slideNineIsolated3 = chordsInput3_v4.slice(slideNineStart3, slideTenStart3);
      var slideTenIsolated3 = chordsInput3_v4.slice(slideTenStart3, slideElevenStart3);
      var slideElevenIsolated3 = chordsInput3_v4.slice(slideElevenStart3, slideTwelveStart3);
      var slideTwelveIsolated3 = chordsInput3_v4.slice(slideTwelveStart3, slideThirteenStart3);
    //remove verse & chorus headers
      var slideOneNeedsTrimmed3 = slideOneIsolated3.replace(/\[.*\]/g, "");
      var slideTwoNeedsTrimmed3 = slideTwoIsolated3.replace(/\[.*\]/g, "");
      var slideThreeNeedsTrimmed3 = slideThreeIsolated3.replace(/\[.*\]/g, "");
      var slideFourNeedsTrimmed3 = slideFourIsolated3.replace(/\[.*\]/g, "");
      var slideFiveNeedsTrimmed3 = slideFiveIsolated3.replace(/\[.*\]/g, "");
      var slideSixNeedsTrimmed3 = slideSixIsolated3.replace(/\[.*\]/g, "");
      var slideSevenNeedsTrimmed3 = slideSevenIsolated3.replace(/\[.*\]/g, "");
      var slideEightNeedsTrimmed3 = slideEightIsolated3.replace(/\[.*\]/g, "");
      var slideNineNeedsTrimmed3 = slideNineIsolated3.replace(/\[.*\]/g, "");
      var slideTenNeedsTrimmed3 = slideTenIsolated3.replace(/\[.*\]/g, "");
      var slideElevenNeedsTrimmed3 = slideElevenIsolated3.replace(/\[.*\]/g, "");
      var slideTwelveNeedsTrimmed3 = slideTwelveIsolated3.replace(/\[.*\]/g, "");
    //trim white space
      var slideOne3 = slideOneNeedsTrimmed3.trim();
      var slideTwo3 = slideTwoNeedsTrimmed3.trim();
      var slideThree3 = slideThreeNeedsTrimmed3.trim();
      var slideFour3 = slideFourNeedsTrimmed3.trim();
      var slideFive3 = slideFiveNeedsTrimmed3.trim();
      var slideSix3 = slideSixNeedsTrimmed3.trim();
      var slideSeven3 = slideSevenNeedsTrimmed3.trim();
      var slideEight3 = slideEightNeedsTrimmed3.trim();
      var slideNine3 = slideNineNeedsTrimmed3.trim();
      var slideTen3 = slideTenNeedsTrimmed3.trim();
      var slideEleven3 = slideElevenNeedsTrimmed3.trim();
      var slideTwelve3 = slideTwelveNeedsTrimmed3.trim();


    //pptx Generator
      var pptx = new PptxGenJS();
      pptx.setLayout('LAYOUT_4x3');
    //Song 1
    //Title Slide
      if (isNaN(title1)) {
        var pptxTitle1 = pptx.addNewSlide({ bkgd: '000000' });
        pptxTitle1.addText(title1, {x: 1.25, y: 3.5, font_size: 40, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'middle'});

    //Slide One
      if (slideTwoStart1>0) {
      var pptxOne1 = pptx.addNewSlide({ bkgd: '000000' });
      pptxOne1.addText(slideOne1, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Two
      if (slideThreeStart1>0) {
      var pptxTwo1 = pptx.addNewSlide({ bkgd: '000000' });
      pptxTwo1.addText(slideTwo1, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Three
      if (slideFourStart1>0) {
      var pptxThree1 = pptx.addNewSlide({ bkgd: '000000' });
      pptxThree1.addText(slideThree1, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Four
      if (slideFiveStart1>0) {
      var pptxFour1 = pptx.addNewSlide({ bkgd: '000000' });
      pptxFour1.addText(slideFour1, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Five
      if (slideSixStart1>0) {
      var pptxFive1 = pptx.addNewSlide({ bkgd: '000000' });
      pptxFive1.addText(slideFive1, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Six
      if (slideSevenStart1>0) {
      var pptxSix1 = pptx.addNewSlide({ bkgd: '000000' });
      pptxSix1.addText(slideSix1, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Seven
      if (slideEightStart1>0) {
      var pptxSeven1 = pptx.addNewSlide({ bkgd: '000000' });
      pptxSeven1.addText(slideSeven1, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Eight
      if (slideNineStart1>0) {
      var pptxEight1 = pptx.addNewSlide({ bkgd: '000000' });
      pptxEight1.addText(slideEight1, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Nine
      if (slideTenStart1>0) {
      var pptxNine1 = pptx.addNewSlide({ bkgd: '000000' });
      pptxNine1.addText(slideNine1, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Ten
      if (slideElevenStart1>0) {
      var pptxTen1 = pptx.addNewSlide({ bkgd: '000000' });
      pptxTen1.addText(slideTen1, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Eleven
      if (slideTwelveStart1>0) {
      var pptxEleven1 = pptx.addNewSlide({ bkgd: '000000' });
      pptxEleven1.addText(slideEleven1, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Twelve
      if (slideThirteenStart1>0) {
      var pptxTwelve1 = pptx.addNewSlide({ bkgd: '000000' });
      pptxTwelve1.addText(slideTwelve1, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
    }};


    //Song 2
    //Title Slide
      if (isNaN(title2)) {
        var pptxTitle1 = pptx.addNewSlide({ bkgd: '000000' });
        pptxTitle1.addText(title2, {x: 1.25, y: 3.5, font_size: 40, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'middle'});

    //Slide One
      if (slideTwoStart2>0) {
      var pptxOne2 = pptx.addNewSlide({ bkgd: '000000' });
      pptxOne2.addText(slideOne2, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Two
      if (slideThreeStart2>0) {
      var pptxTwo2 = pptx.addNewSlide({ bkgd: '000000' });
      pptxTwo2.addText(slideTwo2, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Three
      if (slideFourStart2>0) {
      var pptxThree2 = pptx.addNewSlide({ bkgd: '000000' });
      pptxThree2.addText(slideThree2, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Four
      if (slideFiveStart2>0) {
      var pptxFour2 = pptx.addNewSlide({ bkgd: '000000' });
      pptxFour2.addText(slideFour2, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
    }
    //Slide Five
      if (slideSixStart2>0) {
      var pptxFive2 = pptx.addNewSlide({ bkgd: '000000' });
      pptxFive2.addText(slideFive2, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Six
      if (slideSevenStart2>0) {
      var pptxSix2 = pptx.addNewSlide({ bkgd: '000000' });
      pptxSix2.addText(slideSix2, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Seven
      if (slideEightStart2>0) {
      var pptxSeven2 = pptx.addNewSlide({ bkgd: '000000' });
      pptxSeven2.addText(slideSeven2, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Eight
      if (slideNineStart2>0) {
      var pptxEight2 = pptx.addNewSlide({ bkgd: '000000' });
      pptxEight2.addText(slideEight2, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Nine
      if (slideTenStart2>0) {
      var pptxNine2 = pptx.addNewSlide({ bkgd: '000000' });
      pptxNine2.addText(slideNine2, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Ten
      if (slideElevenStart2>0) {
      var pptxTen2 = pptx.addNewSlide({ bkgd: '000000' });
      pptxTen2.addText(slideTen2, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Eleven
      if (slideTwelveStart2>0) {
      var pptxEleven2 = pptx.addNewSlide({ bkgd: '000000' });
      pptxEleven2.addText(slideEleven2, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Twelve
      if (slideThirteenStart2>0) {
      var pptxTwelve2 = pptx.addNewSlide({ bkgd: '000000' });
      pptxTwelve2.addText(slideTwelve2, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
    }};

    //Song 3
    //Title Slide
      if (isNaN(title3)) {
        var pptxTitle3 = pptx.addNewSlide({ bkgd: '000000' });
        pptxTitle3.addText(title3, {x: 1.25, y: 3.5, font_size: 40, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'middle'});

    //Slide One
      if (slideTwoStart3>0) {
      var pptxOne3 = pptx.addNewSlide({ bkgd: '000000' });
      pptxOne3.addText(slideOne3, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Two
      if (slideThreeStart3>0) {
      var pptxTwo3 = pptx.addNewSlide({ bkgd: '000000' });
      pptxTwo3.addText(slideTwo3, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Three
      if (slideFourStart3>0) {
      var pptxThree3 = pptx.addNewSlide({ bkgd: '000000' });
      pptxThree3.addText(slideThree3, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Four
      if (slideFiveStart3>0) {
      var pptxFour3 = pptx.addNewSlide({ bkgd: '000000' });
      pptxFour3.addText(slideFour3, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Five
      if (slideSixStart3>0) {
      var pptxFive3 = pptx.addNewSlide({ bkgd: '000000' });
      pptxFive3.addText(slideFive3, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Six
      if (slideSevenStart3>0) {
      var pptxSix3 = pptx.addNewSlide({ bkgd: '000000' });
      pptxSix3.addText(slideSix3, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Seven
      if (slideEightStart3>0) {
      var pptxSeven3 = pptx.addNewSlide({ bkgd: '000000' });
      pptxSeven3.addText(slideSeven3, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Eight
      if (slideNineStart3>0) {
      var pptxEight3 = pptx.addNewSlide({ bkgd: '000000' });
      pptxEight3.addText(slideEight3, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Nine
      if (slideTenStart3>0) {
      var pptxNine3 = pptx.addNewSlide({ bkgd: '000000' });
      pptxNine3.addText(slideNine3, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Ten
      if (slideElevenStart3>0) {
      var pptxTen3 = pptx.addNewSlide({ bkgd: '000000' });
      pptxTen3.addText(slideTen3, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Eleven
      if (slideTwelveStart3>0) {
      var pptxEleven3 = pptx.addNewSlide({ bkgd: '000000' });
      pptxEleven3.addText(slideEleven3, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
      }
    //Slide Twelve
      if (slideThirteenStart3>0) {
      var pptxTwelve3 = pptx.addNewSlide({ bkgd: '000000' });
      pptxTwelve3.addText(slideTwelve3, {x: 1.25, y: '3%', font_size: 30, font_face: 'Helvetica', color: 'ffffff', align: 'center', valign: 'top'});
    }};

      pptx.save('Lyrics Slideshow');

      console.log(28);
  });

    //OLD IDEAS

    //remove chords
      // var one3 = chordsInput3.replace(/Am\s|A\s|A#\s|Bm\s|C\s|Dsus|G\s|E\s|Em\s|Em7\s|D\s|Dm\s|F\s|Cadd2|Cadd9|G\/D|D\/F#|G\/B|Dsus4|Am7|-|Am\/G|C\/E/g, "");
      // var two3 = one3.replace(/^\s*[\r\n]*/gm, "");
      //Just an idea: var two = three.replace(/\[Intro]\n\s/,"");

    //pre-processing
      // var chordsInput3_v2 = chordsInput3.replace(/\n\n|\n\n\n|\n\n\n\n/g,/\n/g);

      //slide one clean up
      //remove chords - (chord finder)
        // var spotOne3 = slideOneIsolated3.indexOf("]");
        // var spotTwo3 = slideOneIsolated3.indexOf(/\n/, spotOne3);
        // var spotThree3 = slideOneIsolated3.indexOf(/\n/, spotTwo3 + 1);
        // var spotFour3 = slideOneIsolated3.indexOf(/\n/, spotThree3 + 1);
        // var spotFive3 = slideOneIsolated3.indexOf(/\n/, spotFour3 + 1);
        // var spotSix3 = slideOneIsolated3.indexOf(/\n/, spotFive3 + 1);
        // var spotSeven3 = slideOneIsolated3.indexOf(/\n/, spotSix3 + 1);
        // var spotEight3 = slideOneIsolated3.indexOf(/\n/, spotSeven3 + 1);
      //remove chords - (keeps only lyrics)
        // var goodLyricsOne3 = slideOneIsolated3.substr(spotTwo3,spotThree3);
        // var goodLyricsTwo3 = slideOneIsolated3.substr(spotFour3,spotFive3);
        // var goodLyricsThree3 = slideOneIsolated3.substr(spotFive3,spotSix3);
        // var goodLyricsFour3 = slideOneIsolated3.substr(spotSeven3,spotEight3);
      //remove chords - (merges lyrics)
        // var slideOneClean3 = goodLyricsOne3.concat(goodLyricsTwo3,goodLyricsThree3,goodLyricsFour3);

};

// LYRIC HANDOUT (PDF) works
window.handout = function () {
    var filename = 'Lyric Handout';
    // inputs
      var title1 = document.getElementById("name1").value;
      var chordsInput1 = document.getElementById("chords1").value;
      var title2 = document.getElementById("name2").value;
      var chordsInput2 = document.getElementById("chords2").value;
      var title3 = document.getElementById("name3").value;
      var chordsInput3 = document.getElementById("chords3").value;

    //SONG ONE!!!!!!!!!!!!
      //remove chords
        var chordsInput1_v2 = chordsInput1.replace(/\b([CDEFGAB](?:b|bb)*(?:#|##|sus|maj|min|aug|m)*[\d\/]*(?:[CDEFGAB](?:b|bb)*(?:#|##|sus|maj|min|aug|m)*[\d\/]*)*)(?=\s|$)(?!\w)/gm, "");
      //remove blank lines where chords used to be
        var chordsInput1_v3 = chordsInput1_v2.replace(/^\s*[\r\n]*/gm, "");

    //SONG TWO!!!!!!!!!!!
      //remove chords
        var chordsInput2_v2 = chordsInput2.replace(/\b([CDEFGAB](?:b|bb)*(?:#|##|sus|maj|min|aug|m)*[\d\/]*(?:[CDEFGAB](?:b|bb)*(?:#|##|sus|maj|min|aug|m)*[\d\/]*)*)(?=\s|$)(?!\w)/gm, "");
      //remove blank lines where chords used to be
        var chordsInput2_v3 = chordsInput2_v2.replace(/^\s*[\r\n]*/gm, "");

    //SONG THREE!!!!!!!!!!!
      //remove chords
        var chordsInput3_v2 = chordsInput3.replace(/\b([CDEFGAB](?:b|bb)*(?:#|##|sus|maj|min|aug|m)*[\d\/]*(?:[CDEFGAB](?:b|bb)*(?:#|##|sus|maj|min|aug|m)*[\d\/]*)*)(?=\s|$)(?!\w)/gm, "");
      //remove blank lines where chords used to be
        var chordsInput3_v3 = chordsInput3_v2.replace(/^\s*[\r\n]*/gm, "");

      //Combine
        var song = title1 + "\n" + chordsInput1_v3 + "\n\n" + title2 + "\n" + chordsInput2_v3 + "\n\n" +
          title3 + "\n" + chordsInput3_v3;

    // <!---PDF Generator-->

    // INSERT PAGE
    var doc = new PDFDocument({
      margin: 25,
    });
    window.stream = doc.pipe(blobStream());
    doc.font('Times-Roman');

    doc.fontSize (11);
    doc.text(song, {
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




// LYRICS ON SLIDES (PDF) - RETIRED
// window.slides = function () {
//     var filename = 'Slides';
//     // inputs
//     var title1 = document.getElementById("name1").value;
//     var chordsInput1 = document.getElementById("chords1").value;
//
//     var title2 = document.getElementById("name2").value;
//     var chordsInput2 = document.getElementById("chords2").value;
//
//     var title3 = document.getElementById("name3").value;
//     var chordsInput3 = document.getElementById("chords3").value;
//
//     //reformat!!!!!!!!!!!!!!
//
//     //SONG ONE!!!!!!!!!!!!
//     //remove chords
//     var one1 = chordsInput1.replace(/Am\s|A\s|A#\s|A\/G|Bm\s|C\s|Dsus|G\s|E\s|Em\s|Em7\s|D\s|Dm\s|F\s|Cadd2|Cadd9|G\/D|D\/F#|G\/B|Dsus4|Am7|-|Am\/G|C\/E/g,"");
//     var two1 = one1.replace(/^\s*[\r\n]*/gm,"");
//     //var two = three.replace(/\[Intro]\n\s/,"");
//     //find where to split slides
//     var slideOneStart1 = two1.indexOf("[");
//     var slideTwoStart1 = two1.indexOf("[",slideOneStart1+1);
//     var slideThreeStart1 = two1.indexOf("[",slideTwoStart1+1);
//     var slideFourStart1 = two1.indexOf("[",slideThreeStart1+1);
//     var slideFiveStart1 = two1.indexOf("[",slideFourStart1+1);
//     var slideSixStart1 = two1.indexOf("[",slideFiveStart1+1);
//     var slideSevenStart1 = two1.indexOf("[",slideSixStart1+1);
//     var slideEightStart1 = two1.indexOf("[",slideSevenStart1+1);
//     var slideNineStart1 = two1.indexOf("[",slideEightStart1+1);
//     //split slides
//     var slideOnePre1 = two1.slice(slideOneStart1,slideTwoStart1);
//     var slideTwoPre1 = two1.slice(slideTwoStart1,slideThreeStart1);
//     var slideThreePre1 = two1.slice(slideThreeStart1,slideFourStart1);
//     var slideFourPre1 = two1.slice(slideFourStart1,slideFiveStart1);
//     var slideFivePre1 = two1.slice(slideFiveStart1,slideSixStart1);
//     var slideSixPre1 = two1.slice(slideSixStart1,slideSevenStart1);
//     var slideSevenPre1 = two1.slice(slideSevenStart1,slideEightStart1);
//     var slideEightPre1 = two1.slice(slideEightStart1,slideNineStart1);
//     //remove verse & chorus headers
//     var slideOne1 = slideOnePre1.replace(/\[.*\]/g,"");
//     var slideTwo1 = slideTwoPre1.replace(/\[.*\]/g,"");
//     var slideThree1 = slideThreePre1.replace(/\[.*\]/g,"");
//     var slideFour1 = slideFourPre1.replace(/\[.*\]/g,"");
//     var slideFive1 = slideFivePre1.replace(/\[.*\]/g,"");
//     var slideSix1 = slideSixPre1.replace(/\[.*\]/g,"");
//     var slideSeven1 = slideSevenPre1.replace(/\[.*\]/g,"");
//     var slideEight1 = slideEightPre1.replace(/\[.*\]/g,"");
//
//
//     //SONG TWO!!!!!!!!!!!
//
//     //remove chords
//     var one2 = chordsInput2.replace(/Am\s|A\s|A#\s|Bm\s|C\s|Dsus|G\s|E\s|Em\s|Em7\s|D\s|Dm\s|F\s|Cadd2|Cadd9|G\/D|D\/F#|G\/B|Dsus4|Am7|-|Am\/G|C\/E/g,"");
//     var two2 = one2.replace(/^\s*[\r\n]*/gm,"");
//     //var two = three.replace(/\[Intro]\n\s/,"");
//     //find where to split slides
//     var slideOneStart2 = two2.indexOf("[");
//     var slideTwoStart2 = two2.indexOf("[",slideOneStart2+1);
//     var slideThreeStart2 = two2.indexOf("[",slideTwoStart2+1);
//     var slideFourStart2 = two2.indexOf("[",slideThreeStart2+1);
//     var slideFiveStart2 = two2.indexOf("[",slideFourStart2+1);
//     var slideSixStart2 = two2.indexOf("[",slideFiveStart2+1);
//     var slideSevenStart2 = two2.indexOf("[",slideSixStart2+1);
//     var slideEightStart2 = two2.indexOf("[",slideSevenStart2+1);
//     var slideNineStart2 = two2.indexOf("[",slideEightStart2+1);
//     //split slides
//     var slideOnePre2 = two2.slice(slideOneStart2,slideTwoStart2);
//     var slideTwoPre2 = two2.slice(slideTwoStart2,slideThreeStart2);
//     var slideThreePre2 = two2.slice(slideThreeStart2,slideFourStart2);
//     var slideFourPre2 = two2.slice(slideFourStart2,slideFiveStart2);
//     var slideFivePre2 = two2.slice(slideFiveStart2,slideSixStart2);
//     var slideSixPre2 = two2.slice(slideSixStart2,slideSevenStart2);
//     var slideSevenPre2 = two2.slice(slideSevenStart2,slideEightStart2);
//     var slideEightPre2 = two2.slice(slideEightStart2,slideNineStart2);
//     //remove verse & chorus headers
//     var slideOne2 = slideOnePre2.replace(/\[.*\]/g,"");
//     var slideTwo2 = slideTwoPre2.replace(/\[.*\]/g,"");
//     var slideThree2 = slideThreePre2.replace(/\[.*\]/g,"");
//     var slideFour2 = slideFourPre2.replace(/\[.*\]/g,"");
//     var slideFive2 = slideFivePre2.replace(/\[.*\]/g,"");
//     var slideSix2 = slideSixPre2.replace(/\[.*\]/g,"");
//     var slideSeven2 = slideSevenPre2.replace(/\[.*\]/g,"");
//     var slideEight2 = slideEightPre2.replace(/\[.*\]/g,"");
//
//
//
//     //SONG THREE!!!!!!!!!!!
//
//     //remove chords
//     var one3 = chordsInput3.replace(/Am\s|A\s|A#\s|Bm\s|C\s|Dsus|G\s|E\s|Em\s|Em7\s|D\s|Dm\s|F\s|Cadd2|Cadd9|G\/D|D\/F#|G\/B|Dsus4|Am7|-|Am\/G|C\/E/g,"");
//     var two3 = one3.replace(/^\s*[\r\n]*/gm,"");
//     //var two = three.replace(/\[Intro]\n\s/,"");
//     //find where to split slides
//     var slideOneStart3 = two3.indexOf("[");
//     var slideTwoStart3 = two3.indexOf("[",slideOneStart3+1);
//     var slideThreeStart3 = two3.indexOf("[",slideTwoStart3+1);
//     var slideFourStart3 = two3.indexOf("[",slideThreeStart3+1);
//     var slideFiveStart3 = two3.indexOf("[",slideFourStart3+1);
//     var slideSixStart3 = two3.indexOf("[",slideFiveStart3+1);
//     var slideSevenStart3 = two3.indexOf("[",slideSixStart3+1);
//     var slideEightStart3 = two3.indexOf("[",slideSevenStart3+1);
//     var slideNineStart3 = two3.indexOf("[",slideEightStart3+1);
//     //split slides
//     var slideOnePre3 = two3.slice(slideOneStart3,slideTwoStart3);
//     var slideTwoPre3 = two3.slice(slideTwoStart3,slideThreeStart3);
//     var slideThreePre3 = two3.slice(slideThreeStart3,slideFourStart3);
//     var slideFourPre3 = two3.slice(slideFourStart3,slideFiveStart3);
//     var slideFivePre3 = two3.slice(slideFiveStart3,slideSixStart3);
//     var slideSixPre3 = two3.slice(slideSixStart3,slideSevenStart3);
//     var slideSevenPre3 = two3.slice(slideSevenStart3,slideEightStart3);
//     var slideEightPre3 = two3.slice(slideEightStart3,slideNineStart3);
//     //remove verse & chorus headers
//     var slideOne3 = slideOnePre3.replace(/\[.*\]/g,"");
//     var slideTwo3 = slideTwoPre3.replace(/\[.*\]/g,"");
//     var slideThree3 = slideThreePre3.replace(/\[.*\]/g,"");
//     var slideFour3 = slideFourPre3.replace(/\[.*\]/g,"");
//     var slideFive3 = slideFivePre3.replace(/\[.*\]/g,"");
//     var slideSix3 = slideSixPre3.replace(/\[.*\]/g,"");
//     var slideSeven3 = slideSevenPre3.replace(/\[.*\]/g,"");
//     var slideEight3 = slideEightPre3.replace(/\[.*\]/g,"");
//
//
//
//     // page one
//     var doc = new PDFDocument(
//       {
//         layout: 'landscape'
//       }
//     );
//     window.stream = doc.pipe(blobStream());
//     doc.font('Helvetica');
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//
//     //title slide
//     doc.fontSize(40).fillColor('white');
//     doc.moveDown(4);
//     doc.text(title1, {
//       align: 'center',
//     });
//
//
//     //song one, slide one
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideOne1, {
//       align: 'center',
//     });
//
//     //song one, slide two
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideTwo1, {
//       align: 'center',
//     });
//
//     //song one, slide three
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideThree1, {
//       align: 'center',
//     });
//
//     //song one, slide four
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideFour1, {
//       align: 'center',
//     });
//
//     //song one, slide five
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideFive1, {
//       align: 'center',
//     });
//
//     //song one, slide six
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideSix1, {
//       align: 'center',
//     });
//
//     //song one, slide seven
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideSeven1, {
//       align: 'center',
//     });
//
//     //song one, slide eight
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideEight1, {
//       align: 'center',
//     });
//
//     //SONG TWO!!!!!!!!
//
//     //song two title
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(40).fillColor('white');
//     doc.moveDown(4)
//     doc.text(title2, {
//       align: 'center',
//     });
//
//     //song one, slide one
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideOne2, {
//       align: 'center',
//     });
//
//     //song one, slide two
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideTwo2, {
//       align: 'center',
//     });
//
//     //song one, slide three
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideThree2, {
//       align: 'center',
//     });
//
//     //song one, slide four
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideFour2, {
//       align: 'center',
//     });
//
//     //song one, slide five
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideFive2, {
//       align: 'center',
//     });
//
//     //song one, slide six
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideSix2, {
//       align: 'center',
//     });
//
//     //song one, slide seven
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideSeven2, {
//       align: 'center',
//     });
//
//     //song one, slide eight
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideEight2, {
//       align: 'center',
//     });
//
//
//
//     //SONG THREE!!!!!!!!
//
//     //song two title
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(40).fillColor('white');
//     doc.moveDown(4)
//     doc.text(title3, {
//       align: 'center',
//     });
//
//     //song one, slide one
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideOne3, {
//       align: 'center',
//     });
//
//     //song one, slide two
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideTwo3, {
//       align: 'center',
//     });
//
//     //song one, slide three
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideThree3, {
//       align: 'center',
//     });
//
//     //song one, slide four
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideFour3, {
//       align: 'center',
//     });
//
//     //song one, slide five
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideFive3, {
//       align: 'center',
//     });
//
//     //song one, slide six
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideSix3, {
//       align: 'center',
//     });
//
//     //song one, slide seven
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideSeven3, {
//       align: 'center',
//     });
//
//     //song one, slide eight
//     doc.addPage();
//     doc.rect(0,0,800,800);
//     doc.fillAndStroke("black","#100");
//     doc.fontSize(30).fillColor('white');
//     doc.text(slideEight3, {
//       align: 'center',
//     });
//
//
//
//
//
//
//     doc.end();
//     stream.on('finish', function () {
//     // <!---downloader-->
//     var pom = document.createElement('a');
//     pom.setAttribute('href', stream.toBlobURL('application/pdf'));
//     pom.setAttribute('download', filename);
//     if (document.createEvent) {
//         var event = document.createEvent('MouseEvents');
//         event.initEvent('click', true, true);
//         pom.dispatchEvent(event);
//     }
//     else {
//         pom.click();
//     }
//   })
// };

// LYRICS ON PAPER (DOC) TEST????
window.test = function () {

  var filename = 'Lyrics on Paper';
  // inputs
    var title1 = document.getElementById("name1").value;
    var chordsInput1 = document.getElementById("chords1").value;
    var title2 = document.getElementById("name2").value;
    var chordsInput2 = document.getElementById("chords2").value;
    var title3 = document.getElementById("name3").value;
    var chordsInput3 = document.getElementById("chords3").value;

  //SONG ONE!!!!!!!!!!!!

    //remove chords
      var chordsInput1_v2 = chordsInput1.replace(/\b([CDEFGAB](?:b|bb)*(?:#|##|sus|maj|min|aug|m)*[\d\/]*(?:[CDEFGAB](?:b|bb)*(?:#|##|sus|maj|min|aug|m)*[\d\/]*)*)(?=\s|$)(?!\w)/gm, "");
    //remove blank lines where chords used to be
      var chordsInput1_v3 = chordsInput1_v2.replace(/^\s*[\r\n]*/gm, "");
    //add a marker at the end of the input so the following code can find the last slide
      var chordsInput1_v4 = chordsInput1_v3 + "[";
    //find where to split slides
      var slideOneStart1 = chordsInput1_v4.indexOf("[");
      var slideTwoStart1 = chordsInput1_v4.indexOf("[", slideOneStart1 + 1);
      var slideThreeStart1 = chordsInput1_v4.indexOf("[", slideTwoStart1 + 1);
      var slideFourStart1 = chordsInput1_v4.indexOf("[", slideThreeStart1 + 1);
      var slideFiveStart1 = chordsInput1_v4.indexOf("[", slideFourStart1 + 1);
      var slideSixStart1 = chordsInput1_v4.indexOf("[", slideFiveStart1 + 1);
      var slideSevenStart1 = chordsInput1_v4.indexOf("[", slideSixStart1 + 1);
      var slideEightStart1 = chordsInput1_v4.indexOf("[", slideSevenStart1 + 1);
      var slideNineStart1 = chordsInput1_v4.indexOf("[", slideEightStart1 + 1);
      var slideTenStart1 = chordsInput1_v4.indexOf("[", slideNineStart1 + 1);
      var slideElevenStart1 = chordsInput1_v4.indexOf("[", slideTenStart1 + 1);
      var slideTwelveStart1 = chordsInput1_v4.indexOf("[", slideElevenStart1 + 1);
      var slideThirteenStart1 = chordsInput1_v4.indexOf("[", slideTwelveStart1 + 1);
    //prevent error where it prints duplicate slides
       if (slideThreeStart1<0) {
         slideFourStart1 = -1
         slideFiveStart1 = -1
         slideSixStart1 = -1
         slideSevenStart1 = -1
         slideEightStart1 = -1
         slideNineStart1 = -1
         slideTenStart1 = -1
         slideElevenStart1 = -1
         slideTwelveStart1 = -1
         slideThirteenStart1 = -1
       }
       if (slideFourStart1<0) {
         slideFiveStart1 = -1
         slideSixStart1 = -1
         slideSevenStart1 = -1
         slideEightStart1 = -1
         slideNineStart1 = -1
         slideTenStart1 = -1
         slideElevenStart1 = -1
         slideTwelveStart1 = -1
         slideThirteenStart1 = -1
       }
       if (slideFiveStart1<0) {
         slideSixStart1 = -1
         slideSevenStart1 = -1
         slideEightStart1 = -1
         slideNineStart1 = -1
         slideTenStart1 = -1
         slideElevenStart1 = -1
         slideTwelveStart1 = -1
         slideThirteenStart1 = -1
       }
       if (slideSixStart1<0) {
         slideSevenStart1 = -1
         slideEightStart1 = -1
         slideNineStart1 = -1
         slideTenStart1 = -1
         slideElevenStart1 = -1
         slideTwelveStart1 = -1
         slideThirteenStart1 = -1
       }
       if (slideSevenStart1<0) {
         slideEightStart1 = -1
         slideNineStart1 = -1
         slideTenStart1 = -1
         slideElevenStart1 = -1
         slideTwelveStart1 = -1
         slideThirteenStart1 = -1
       }
       if (slideEightStart1<0) {
         slideNineStart1 = -1
         slideTenStart1 = -1
         slideElevenStart1 = -1
         slideTwelveStart1 = -1
         slideThirteenStart1 = -1
       }
       if (slideNineStart1<0) {
         slideTenStart1 = -1
         slideElevenStart1 = -1
         slideTwelveStart1 = -1
         slideThirteenStart1 = -1
       }
       if (slideTenStart1<0) {
         slideElevenStart1 = -1
         slideTwelveStart1 = -1
         slideThirteenStart1 = -1
       }
       if (slideElevenStart1<0) {
         slideTwelveStart1 = -1
         slideThirteenStart1 = -1
       }
       if (slideTwelveStart1<0) {
         slideThirteenStart1 = -1
       }

    //split slides
      var slideOneIsolated1 = chordsInput1_v4.slice(slideOneStart1, slideTwoStart1);
      var slideTwoIsolated1 = chordsInput1_v4.slice(slideTwoStart1, slideThreeStart1);
      var slideThreeIsolated1 = chordsInput1_v4.slice(slideThreeStart1, slideFourStart1);
      var slideFourIsolated1 = chordsInput1_v4.slice(slideFourStart1, slideFiveStart1);
      var slideFiveIsolated1 = chordsInput1_v4.slice(slideFiveStart1, slideSixStart1);
      var slideSixIsolated1 = chordsInput1_v4.slice(slideSixStart1, slideSevenStart1);
      var slideSevenIsolated1 = chordsInput1_v4.slice(slideSevenStart1, slideEightStart1);
      var slideEightIsolated1 = chordsInput1_v4.slice(slideEightStart1, slideNineStart1);
      var slideNineIsolated1 = chordsInput1_v4.slice(slideNineStart1, slideTenStart1);
      var slideTenIsolated1 = chordsInput1_v4.slice(slideTenStart1, slideElevenStart1);
      var slideElevenIsolated1 = chordsInput1_v4.slice(slideElevenStart1, slideTwelveStart1);
      var slideTwelveIsolated1 = chordsInput1_v4.slice(slideTwelveStart1, slideThirteenStart1);
    //trim white space
      var slideOne1 = slideOneIsolated1.trim();
      var slideTwo1 = slideTwoIsolated1.trim();
      var slideThree1 = slideThreeIsolated1.trim();
      var slideFour1 = slideFourIsolated1.trim();
      var slideFive1 = slideFiveIsolated1.trim();
      var slideSix1 = slideSixIsolated1.trim();
      var slideSeven1 = slideSevenIsolated1.trim();
      var slideEight1 = slideEightIsolated1.trim();
      var slideNine1 = slideNineIsolated1.trim();
      var slideTen1 = slideTenIsolated1.trim();
      var slideEleven1 = slideElevenIsolated1.trim();
      var slideTwelve1 = slideTwelveIsolated1.trim();


    //SONG TWO!!!!!!!!!!!

      //remove chords
        var chordsInput2_v2 = chordsInput2.replace(/\b([CDEFGAB](?:b|bb)*(?:#|##|sus|maj|min|aug|m)*[\d\/]*(?:[CDEFGAB](?:b|bb)*(?:#|##|sus|maj|min|aug|m)*[\d\/]*)*)(?=\s|$)(?!\w)/gm, "");
      //remove blank lines where chords used to be
        var chordsInput2_v3 = chordsInput2_v2.replace(/^\s*[\r\n]*/gm, "");
      //add a marker at the end of the input so the following code can find the last slide
        var chordsInput2_v4 = chordsInput2_v3 + "[";
      //find where to split slides
        var slideOneStart2 = chordsInput2_v4.indexOf("[");
        var slideTwoStart2 = chordsInput2_v4.indexOf("[", slideOneStart2 + 1);
        var slideThreeStart2 = chordsInput2_v4.indexOf("[", slideTwoStart2 + 1);
        var slideFourStart2 = chordsInput2_v4.indexOf("[", slideThreeStart2 + 1);
        var slideFiveStart2 = chordsInput2_v4.indexOf("[", slideFourStart2 + 1);
        var slideSixStart2 = chordsInput2_v4.indexOf("[", slideFiveStart2 + 1);
        var slideSevenStart2 = chordsInput2_v4.indexOf("[", slideSixStart2 + 1);
        var slideEightStart2 = chordsInput2_v4.indexOf("[", slideSevenStart2 + 1);
        var slideNineStart2 = chordsInput2_v4.indexOf("[", slideEightStart2 + 1);
        var slideTenStart2 = chordsInput2_v4.indexOf("[", slideNineStart2 + 1);
        var slideElevenStart2 = chordsInput2_v4.indexOf("[", slideTenStart2 + 1);
        var slideTwelveStart2 = chordsInput2_v4.indexOf("[", slideElevenStart2 + 1);
        var slideThirteenStart2 = chordsInput2_v4.indexOf("[", slideTwelveStart2 + 1);
      //prevent error where it prints duplicate slides
         if (slideThreeStart2<0) {
           slideFourStart2 = -1
           slideFiveStart2 = -1
           slideSixStart2 = -1
           slideSevenStart2 = -1
           slideEightStart2 = -1
           slideNineStart2 = -1
           slideTenStart2 = -1
           slideElevenStart2 = -1
           slideTwelveStart2 = -1
           slideThirteenStart2 = -1
         }
         if (slideFourStart2<0) {
           slideFiveStart2 = -1
           slideSixStart2 = -1
           slideSevenStart2 = -1
           slideEightStart2 = -1
           slideNineStart2 = -1
           slideTenStart2 = -1
           slideElevenStart2 = -1
           slideTwelveStart2 = -1
           slideThirteenStart2 = -1
         }
         if (slideFiveStart2<0) {
           slideSixStart2 = -1
           slideSevenStart2 = -1
           slideEightStart2 = -1
           slideNineStart2 = -1
           slideTenStart2 = -1
           slideElevenStart2 = -1
           slideTwelveStart2 = -1
           slideThirteenStart2 = -1
         }
         if (slideSixStart2<0) {
           slideSevenStart2 = -1
           slideEightStart2 = -1
           slideNineStart2 = -1
           slideTenStart2 = -1
           slideElevenStart2 = -1
           slideTwelveStart2 = -1
           slideThirteenStart2 = -1
         }
         if (slideSevenStart2<0) {
           slideEightStart2 = -1
           slideNineStart2 = -1
           slideTenStart2 = -1
           slideElevenStart2 = -1
           slideTwelveStart2 = -1
           slideThirteenStart2 = -1
         }
         if (slideEightStart2<0) {
           slideNineStart2 = -1
           slideTenStart2 = -1
           slideElevenStart2 = -1
           slideTwelveStart2 = -1
           slideThirteenStart2 = -1
         }
         if (slideNineStart2<0) {
           slideTenStart2 = -1
           slideElevenStart2 = -1
           slideTwelveStart2 = -1
           slideThirteenStart2 = -1
         }
         if (slideTenStart2<0) {
           slideElevenStart2 = -1
           slideTwelveStart2 = -1
           slideThirteenStart2 = -1
         }
         if (slideElevenStart2<0) {
           slideTwelveStart2 = -1
           slideThirteenStart2 = -1
         }
         if (slideTwelveStart2<0) {
           slideThirteenStart2 = -1
         }

      //split slides
        var slideOneIsolated2 = chordsInput2_v4.slice(slideOneStart2, slideTwoStart2);
        var slideTwoIsolated2 = chordsInput2_v4.slice(slideTwoStart2, slideThreeStart2);
        var slideThreeIsolated2 = chordsInput2_v4.slice(slideThreeStart2, slideFourStart2);
        var slideFourIsolated2 = chordsInput2_v4.slice(slideFourStart2, slideFiveStart2);
        var slideFiveIsolated2 = chordsInput2_v4.slice(slideFiveStart2, slideSixStart2);
        var slideSixIsolated2 = chordsInput2_v4.slice(slideSixStart2, slideSevenStart2);
        var slideSevenIsolated2 = chordsInput2_v4.slice(slideSevenStart2, slideEightStart2);
        var slideEightIsolated2 = chordsInput2_v4.slice(slideEightStart2, slideNineStart2);
        var slideNineIsolated2 = chordsInput2_v4.slice(slideNineStart2, slideTenStart2);
        var slideTenIsolated2 = chordsInput2_v4.slice(slideTenStart2, slideElevenStart2);
        var slideElevenIsolated2 = chordsInput2_v4.slice(slideElevenStart2, slideTwelveStart2);
        var slideTwelveIsolated2 = chordsInput2_v4.slice(slideTwelveStart2, slideThirteenStart2);
      //trim white space
        var slideOne2 = slideOneIsolated2.trim();
        var slideTwo2 = slideTwoIsolated2.trim();
        var slideThree2 = slideThreeIsolated2.trim();
        var slideFour2 = slideFourIsolated2.trim();
        var slideFive2 = slideFiveIsolated2.trim();
        var slideSix2 = slideSixIsolated2.trim();
        var slideSeven2 = slideSevenIsolated2.trim();
        var slideEight2 = slideEightIsolated2.trim();
        var slideNine2 = slideNineIsolated2.trim();
        var slideTen2 = slideTenIsolated2.trim();
        var slideEleven2 = slideElevenIsolated2.trim();
        var slideTwelve2 = slideTwelveIsolated2.trim();



      //SONG THREE!!!!!!!!!!!

      //remove chords
        var chordsInput3_v2 = chordsInput3.replace(/\b([CDEFGAB](?:b|bb)*(?:#|##|sus|maj|min|aug|m)*[\d\/]*(?:[CDEFGAB](?:b|bb)*(?:#|##|sus|maj|min|aug|m)*[\d\/]*)*)(?=\s|$)(?!\w)/gm, "");
      //remove blank lines where chords used to be
        var chordsInput3_v3 = chordsInput3_v2.replace(/^\s*[\r\n]*/gm, "");
      //add a marker at the end of the input so the following code can find the last slide
        var chordsInput3_v4 = chordsInput3_v3 + "[";
      //find where to split slides
        var slideOneStart3 = chordsInput3_v4.indexOf("[");
        var slideTwoStart3 = chordsInput3_v4.indexOf("[", slideOneStart3 + 1);
        var slideThreeStart3 = chordsInput3_v4.indexOf("[", slideTwoStart3 + 1);
        var slideFourStart3 = chordsInput3_v4.indexOf("[", slideThreeStart3 + 1);
        var slideFiveStart3 = chordsInput3_v4.indexOf("[", slideFourStart3 + 1);
        var slideSixStart3 = chordsInput3_v4.indexOf("[", slideFiveStart3 + 1);
        var slideSevenStart3 = chordsInput3_v4.indexOf("[", slideSixStart3 + 1);
        var slideEightStart3 = chordsInput3_v4.indexOf("[", slideSevenStart3 + 1);
        var slideNineStart3 = chordsInput3_v4.indexOf("[", slideEightStart3 + 1);
        var slideTenStart3 = chordsInput3_v4.indexOf("[", slideNineStart3 + 1);
        var slideElevenStart3 = chordsInput3_v4.indexOf("[", slideTenStart3 + 1);
        var slideTwelveStart3 = chordsInput3_v4.indexOf("[", slideElevenStart3 + 1);
        var slideThirteenStart3 = chordsInput3_v4.indexOf("[", slideTwelveStart3 + 1);
      //prevent error where it prints duplicate slides
         if (slideThreeStart3<0) {
           slideFourStart3 = -1
           slideFiveStart3 = -1
           slideSixStart3 = -1
           slideSevenStart3 = -1
           slideEightStart3 = -1
           slideNineStart3 = -1
           slideTenStart3 = -1
           slideElevenStart3 = -1
           slideTwelveStart3 = -1
           slideThirteenStart3 = -1
         }
         if (slideFourStart3<0) {
           slideFiveStart3 = -1
           slideSixStart3 = -1
           slideSevenStart3 = -1
           slideEightStart3 = -1
           slideNineStart3 = -1
           slideTenStart3 = -1
           slideElevenStart3 = -1
           slideTwelveStart3 = -1
           slideThirteenStart3 = -1
         }
         if (slideFiveStart3<0) {
           slideSixStart3 = -1
           slideSevenStart3 = -1
           slideEightStart3 = -1
           slideNineStart3 = -1
           slideTenStart3 = -1
           slideElevenStart3 = -1
           slideTwelveStart3 = -1
           slideThirteenStart3 = -1
         }
         if (slideSixStart3<0) {
           slideSevenStart3 = -1
           slideEightStart3 = -1
           slideNineStart3 = -1
           slideTenStart3 = -1
           slideElevenStart3 = -1
           slideTwelveStart3 = -1
           slideThirteenStart3 = -1
         }
         if (slideSevenStart3<0) {
           slideEightStart3 = -1
           slideNineStart3 = -1
           slideTenStart3 = -1
           slideElevenStart3 = -1
           slideTwelveStart3 = -1
           slideThirteenStart3 = -1
         }
         if (slideEightStart3<0) {
           slideNineStart3 = -1
           slideTenStart3 = -1
           slideElevenStart3 = -1
           slideTwelveStart3 = -1
           slideThirteenStart3 = -1
         }
         if (slideNineStart3<0) {
           slideTenStart3 = -1
           slideElevenStart3 = -1
           slideTwelveStart3 = -1
           slideThirteenStart3 = -1
         }
         if (slideTenStart3<0) {
           slideElevenStart3 = -1
           slideTwelveStart3 = -1
           slideThirteenStart3 = -1
         }
         if (slideElevenStart3<0) {
           slideTwelveStart3 = -1
           slideThirteenStart3 = -1
         }
         if (slideTwelveStart3<0) {
           slideThirteenStart3 = -1
         }

      //split slides
        var slideOneIsolated3 = chordsInput3_v4.slice(slideOneStart3, slideTwoStart3);
        var slideTwoIsolated3 = chordsInput3_v4.slice(slideTwoStart3, slideThreeStart3);
        var slideThreeIsolated3 = chordsInput3_v4.slice(slideThreeStart3, slideFourStart3);
        var slideFourIsolated3 = chordsInput3_v4.slice(slideFourStart3, slideFiveStart3);
        var slideFiveIsolated3 = chordsInput3_v4.slice(slideFiveStart3, slideSixStart3);
        var slideSixIsolated3 = chordsInput3_v4.slice(slideSixStart3, slideSevenStart3);
        var slideSevenIsolated3 = chordsInput3_v4.slice(slideSevenStart3, slideEightStart3);
        var slideEightIsolated3 = chordsInput3_v4.slice(slideEightStart3, slideNineStart3);
        var slideNineIsolated3 = chordsInput3_v4.slice(slideNineStart3, slideTenStart3);
        var slideTenIsolated3 = chordsInput3_v4.slice(slideTenStart3, slideElevenStart3);
        var slideElevenIsolated3 = chordsInput3_v4.slice(slideElevenStart3, slideTwelveStart3);
        var slideTwelveIsolated3 = chordsInput3_v4.slice(slideTwelveStart3, slideThirteenStart3);
      //trim white space
        var slideOne3 = slideOneIsolated3.trim();
        var slideTwo3 = slideTwoIsolated3.trim();
        var slideThree3 = slideThreeIsolated3.trim();
        var slideFour3 = slideFourIsolated3.trim();
        var slideFive3 = slideFiveIsolated3.trim();
        var slideSix3 = slideSixIsolated3.trim();
        var slideSeven3 = slideSevenIsolated3.trim();
        var slideEight3 = slideEightIsolated3.trim();
        var slideNine3 = slideNineIsolated3.trim();
        var slideTen3 = slideTenIsolated3.trim();
        var slideEleven3 = slideElevenIsolated3.trim();
        var slideTwelve3 = slideTwelveIsolated3.trim();



        var docx = require('docx');

        var doc = new docx.Document();
        var paragraph = new docx.Paragraph("Some cool text here.");
        var exporter = new docx.LocalPacker(doc);
        exporter.pack('My Document');



        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(doc));
        pom.setAttribute('download', exporter);
        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
        }
        else {
            pom.click();
        }








        //
        // const docx = require('docx');
        // const express = require('express');
        // const app = express();
        //
        //
        // app.get("/", (req, res) => {
        //     var doc = new docx.Document();
        //
        //     var paragraph = new docx.Paragraph("Hello World");
        //
        //     doc.addParagraph(paragraph);
        //     const expressPacker = new docx.ExpressPacker(doc, res);
        //     expressPacker.pack("Document");
        //     // response.end("Hello world!");
        // });








        //
        // const express = require('express');
        // const app = express();
        //
        // app.get('/', (req, res) => res.send('Hello World!'));
        //
        // app.listen(3000, () => console.log('Example app listening on port 3000!'));
















      // const docx = require('docx');
      //
      // //CREATE FILE
      //   var doc = new Document();
      //
      //
      //   var paragraph = new docx.Paragraph(title1);
      //   paragraph.addRun(new docx.TextRun(chordsInput1));
      //
      //   doc.addParagraph(paragraph);
      //
      //
      //   //export file
      //   var exporter = new docx.LocalPacker(doc);
      //   exporter.pack('My First Document');
      };
