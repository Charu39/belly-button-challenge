//Use the D3 library to read in samples.json.
function init() {
    const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"
    samples = d3.json(url).then(function(data) {
        let samples = data['samples']
        let info = data['metadata']
        let names  = data['names']
        setPlots(data,0)
        setInfo(info,0)
        setDropDown(names);
    });
};

init()

 function setDropDown(names){ 
    //fetch data from the json file
    let idNum = ''
    let dropdownMenu= d3.select("#selDataset")
    for  (let i =0 ;i< names.length;i++){
        idNum = names[i]
        dropdownMenu.append("option").text(idNum).property("value",i)
     };
};

function setPlots(dataSet, id = 0){
    let samples = dataSet['samples']
    let info = dataSet['metadata']
    // initialize bar chart
    let barY = []
    for (let i=0;i<10;i++) {
        barY.push(`OTU ${samples[id].otu_ids[i]}`)
    };
    data = [{
        x: samples[id].sample_values.slice(0,10).reverse(),
        y: barY.reverse(),
        text: samples[id].otu_labels.slice(0,10).reverse() ,
        type:"bar",
        orientation: "h"
    }];
    layout={
        title: `Top 10 OTUs`,
        height:600,
        width: 400,
    };
    Plotly.newPlot("bar",data,layout);

    // Initialize bubble chart
    data = [{
        x:samples[id].otu_ids,
        y:samples[id].sample_values,
        mode:'markers',
        marker:{size:samples[id].sample_values,
        color:samples[id].otu_ids},
        colorscale: 'Earth',
        text:samples[id].otu_labels
    }];
    layout2 ={xaxis: {title: "OTU ID"},
    height:600,
    width: 1300,
    };
    Plotly.newPlot('bubble',data,layout2);
};
//function to get the selected Id and call the functions to update plots and metadata
function setInfo(info, id=0) {
    //Initialize metadata
    tb= d3.select('.panet-body').append('p')
    lines =tb.html(`id:${info[id]['id']}<br>
    ethnicity: ${info[id]['ethnicity']}<br>
    gender: ${info[id]['gender']}<br>
    age: ${info[id]['age']}<br>
    location: ${info[id]['location']}<br>
    bbtype: ${info[id]['bbtype']}<br>
    wfreq: ${info[id]['wfreq']}`)
    lines.style('font-size', '85%')
};

function resetPlots(samples, id=0){
    //reset bar chart
    points = 10
    if (samples[id].sample_values.length<10){
        points= samples[id].sample_values.length;
    };

    let barY = []
    for (i=0; i <points ; i++){
        barY.push(`OTU${samples[id].otu_ids[i]}`)
    };

    Plotly.restyle("bar", "x", [samples[id].sample_values.slice(0,points).reverse()]);
    Plotly.restyle("bar", "y", [barY.reverse()]);
    Plotly.restyle("bar", "text"[samples[id].sample_values.slice(0,points).reverse()]);
    
    //reset bubble chart
    Plotly.restyle("bubble", "x", [samples[id].otu_ids]);
    Plotly.restyle("bubble", "y", [samples[id].sample_values]);
    Plotly.restyle("bubble", "marker", [{size: samples[id].sample_values, color:samples[id].otu_ids, colorscale:'Earth'}]);
    Plotly.restyle("bubble", "text", [samples[id].otu_labels]);
};

function resetInfo(info,id=0){
    //reset info
    tb= d3.select('.panet-body')
    lines =tb.html(`id:${info[id]['id']}<br>
    ethnicity: ${info[id]['ethnicity']}<br>
    gender: ${info[id]['gender']}<br>
    age: ${info[id]['age']}<br>
    location: ${info[id]['location']}<br>
    bbtype: ${info[id]['bbtype']}<br>
    wfreq: ${info[id]['wfreq']}`)
    lines.style('font-size', '85%')

};
function optionChanged() {
    const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"
    samples = d3.json(url).then(function(data) {
        let samples = data['samples']
        let info = data['metadata']
        let dropdownMenu  = d3.select("#selDataset");
        let id = dropdownMenu.property("value")
        resetPlots(samples,parseInt(id))
        resetInfo(info,id)
    });
};




             

