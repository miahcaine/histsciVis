let covidData;
let parent = "covidBubble";

loadData();
let parseDate = d3.timeParse("%Y-%m-%d");
function loadData() {
    // todo: load in TB data

    d3.csv("./data/WHO-COVID-19-global-data.csv").then(function (csv) {

        csv.forEach(function (d) {
            // Convert string to 'date object'
            d.Date_reported = parseDate(d.Date_reported);
            // Convert numeric values to 'numbers'
            d.Cumulative_deaths = +d.Cumulative_deaths;
            d.Cumulative_cases = +d.Cumulative_cases;
            d.New_deaths = +d.New_deaths;
            d.New_cases = +d.New_cases;
        });


        // Store csv data in global variable

        covidData = csv;
        // Draw the visualization
        updateVisualization();
    });
}

// Render visualization
function updateVisualization() {
    // todo:

    let filteredData;
    yearMax = d3.max(covidData, d => d.Date_reported);
    filteredData = covidData.filter((d) => {
        return d.Date_reported >= yearMax;
    });
    let covidBubbles = new Bubbles(parent, filteredData, true)

}