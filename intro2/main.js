let covidData;
let tbData;
let parseDate = d3.timeParse("%Y-%m-%d");

loadData();

function loadData() {
    let promises = [
        d3.csv("../data/WHO-COVID-19-global-data.csv"), 
        d3.csv("../data/TB_burden_countries_2021-11-26.csv")
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
            covidData = csv;
        } else {
            // convert tb data!!
            tbData = csv;
        }
        updateVisualization();
    })
    // d3.csv("../data/WHO-COVID-19-global-data.csv").then(function (csv) {

    //     csv.forEach(function (d) {
    //         // Convert string to 'date object'
    //         d.Date_reported = parseDate(d.Date_reported);
    //         // Convert numeric values to 'numbers'
    //         d.Cumulative_deaths = +d.Cumulative_deaths;
    //         d.Cumulative_cases = +d.Cumulative_cases;
    //         d.New_deaths = +d.New_deaths;
    //         d.New_cases = +d.New_cases;
    //     });


    //     // Store csv data in global variable

    //     covidData = csv;
    //     // Draw the visualization
    //     updateVisualization();
    // });
}

// Render visualization
function updateVisualization() {
    let filteredData;
    yearMax = d3.max(covidData, d => d.Date_reported);
    filteredCovidData = covidData.filter((d) => {
        return d.Date_reported >= yearMax;
    });
    let covidBubbles = new Bubbles("covidBubble", filteredData, true)
    let tbBubbles = new Bubbles("tbBubble", filteredData, true)

}