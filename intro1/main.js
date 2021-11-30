let data;
let isCovid;

let parseDate = d3.timeParse("%Y-%m-%d");

loadData();

function loadData() {
    let promises = [
        d3.csv("../data/WHO-COVID-19-global-data.csv"),
        d3.csv("../data/tb_deaths.csv")
    ];

    Promise.all(promises).then(function(csv) {
        columns = Object.keys( csv[0] );
        if (columns.length == 8) { // if the csv is the COVID data...
            csv.forEach(function (d) {
                // Convert string to 'date object'
                d.Date_reported = parseDate(d.Date_reported);
                // Convert numeric values to 'numbers'
                d.Cumulative_deaths = +d.Cumulative_deaths;
                d.Cumulative_cases = +d.Cumulative_cases;
                d.New_deaths = +d.New_deaths;
                d.New_cases = +d.New_cases;
            });
            data = csv;
            isCovid = true;
        } else {
            isCovid = false;
            // convert tb data!!
            csv.forEach(function (d) {
                // d.year = +d.year;
                // Convert numeric values to 'numbers'
                d.cum_deaths = parseFloat(d.cum_deaths);
            });
            data = csv;
            console.log("TB DATA", data)
        }
        
        updateVisualization();
    });
    
}

// Render visualization
function updateVisualization() {
    // todo:
    let filteredData;
    if (isCovid){
        yearMax = d3.max(data, d => d.Date_reported);
        filteredData = data.filter((d) => {
            return d.Date_reported >= yearMax;
        });
        let covidBubbles = new Bubbles("covidBubble", filteredData, true)
        
    } else {
        filteredData = data;
        let tbBubbles = new Bubbles("tbBubble", filteredData, false)
    }
    
    
    

}