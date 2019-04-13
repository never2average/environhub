var $accountsTemplate;
var $timelineTemplate;
var $imagesTemplate;
function fillAccounts(){
    $.ajax({
        type:"GET",
        url:"http://localhost:5000/api/issue/account",
        headers:{
            "issue": window.location.href.split('/').reverse()[0]
        },
        success: function(res){
            var array = JSON.parse(res).data;
            var i;
            for (i = 0; i < array.length; i++) {
                var accountsTemplateSingle=$($accountsTemplate.clone().html());
                accountsTemplateSingle.attr("id","account-"+i);
                accountsTemplateSingle.find(".accounts-text").text("\""+array[i][2]+"\"");
                accountsTemplateSingle.find(".accounts-teller").text(array[i][0]);
                accountsTemplateSingle.find(".accounts-teller-position").text(array[i][1]);
                $("#container-accounts").append(accountsTemplateSingle);
            }
        },
        error: function(){
            return false;
        }
    });
}
function fillTimeline(){
    $.ajax({
        type:"GET",
        url:"http://localhost:5000/api/issue/timeline",
        headers:{
            "issue": window.location.href.split('/').reverse()[0]
        },
        success: function(res){
            var array = JSON.parse(res).data;
            var i;
            for (i = 0; i < array.length; i++) {
                var timelineTemplateSingle=$($timelineTemplate.clone().html());
                timelineTemplateSingle.attr("id","timeline-"+i);
                timelineTemplateSingle.find(".timeline-desc").text(array[i][1]);
                var date = new Date(array[i][2]*1000);
                var today = date.toISOString().substring(0, 10);
                timelineTemplateSingle.find(".timeline-stamp").text(today);
                if (array[i][0].toLowerCase()=="media intervention") {
                    timelineTemplateSingle.find(".timeline-images").attr("src", "https://www.pinclipart.com/picdir/middle/5-50567_film-clipart-media-camera-film-maker-clipart-png.png");
                }
                if (array[i][0].toLowerCase()=="political intervention") {
                    timelineTemplateSingle.find(".timeline-images").attr("src", "http://clipart-library.com/image_gallery/137134.png");
                }
                if (array[i][0].toLowerCase()=="court judgement") {
                    timelineTemplateSingle.find(".timeline-images").attr("src", "http://srilankabrief.org/wp-content/uploads/2016/07/2000px-Seal_of_the_Judicial_Yuan.svg.png");
                }
                if (array[i][0].toLowerCase()=="geographical effect" || array[i][0].toLowerCase()=="geological effect") {
                    timelineTemplateSingle.find(".timeline-images").attr("src", "http://clipart-library.com/data_images/373540.png");
                }
                if (array[i][0].toLowerCase()=="actions taken") {
                    timelineTemplateSingle.find(".timeline-images").attr("src", "https://ya-webdesign.com/images/politics-clipart-group-debate-15.png");
                }
                $("#container-timeline").append(timelineTemplateSingle);
            }
        },
        error: function(){
            return false;
        }
    });
}

function fillTimePlot(){
    return new Promise((resolve, reject) => {
        $.ajax({
            type:"GET",
            url:"http://localhost:5000/api/issue/time",
            headers:{
                "issue": window.location.href.split('/').reverse()[0]
            },
            success: function(res){
                var array = JSON.parse(res).data;
                resolve( array );
            },
            error: function(){
                return false;
            }
        });     
    })
   
}

function getImages(){
    $.ajax({
        type:"GET",
        url:"http://localhost:5000/api/issue/images",
        headers:{
            "issue": window.location.href.split('/').reverse()[0]
        },
        success: function(res){
            var array = JSON.parse(res).data;
            console.log(array);
            var i;
            for (i = 0; i < array.length; i++) {
                var imageTemplateSingle=$($imagesTemplate.clone().html());
                imageTemplateSingle.find(".issue-images").attr("src", array[i]);
                $("#container-images").append(imageTemplateSingle);
            }
        },
        error: function(){
            return false;
        }
    });
}

async function drawChart() {
    var array = await fillTimePlot();
    var data = google.visualization.arrayToDataTable(array);
    var options = {
        hAxis: {
            textStyle: {
                color: 'white'
            },
            baselineColor: '#FFFFFF'
        },
        vAxis: {
            textStyle: {
                color: 'white'
            },
            gridlines: {
                color: 'transparent'
            },
            baselineColor: '#FFFFFF'
        },
        backgroundColor: 'transparent',
        legend: {position: 'none'}
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart_time'));
    chart.draw(data, options);
}


$(function(){
    $accountsTemplate = $("#template-accounts");
    $timelineTemplate = $("#template-timeline");
    $imagesTemplate = $("#template-images");
    fillAccounts();
    fillTimeline();
    getImages();
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);  
});