let covidData;

loadData();
// console.log(d3.csv("./data/WHO-COVID-19-global-data.csv"))
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
        console.log(covidData);
        // Draw the visualization for the first time
        updateVisualization();
    });
}

// Render visualization
function updateVisualization() {
    // todo:
    // filter / aggregate total deaths over all countries
    // draw circle with radius of the people in millions
    // console.log(d3.max(covidData, d => d.Date_reported))
    let filteredData;
    // if (filterTime == false){
    // 	yearMin = d3.min(data, d => d.YEAR);		// min and max of year
    yearMax = d3.max(covidData, d => d.Date_reported);
    filteredData = covidData;
    // }
    // else{
    // 	yearMin = parseDate(document.getElementById("lower-bound").value);
    // 	yearMax = parseDate(document.getElementById("upper-bound").value);
    filteredData = covidData.filter((d) => {
        return d.Date_reported >= yearMax;
    });
    console.log(filteredData);
    // }
    // x.domain([yearMin, yearMax]);
    // // get attriibute on change
    // d3.select("#select-attributes").on("change", function() {
    // 	let selection = d3.select("#select-attributes").property("value");
    // 	attribute = selection;
    // 	updateVisualization();
    // });

    // let goalsMin = d3.min(data, d => d.GOALS);		// min and max of goals
    // let goalsMax = d3.max(data, d => d.GOALS);
    // let avgGoalsMin = d3.min(data, d => d.AVERAGE_GOALS);		// min and max of avg goals
    // let avgGoalsMax = d3.max(data, d => d.AVERAGE_GOALS);
    // let avgAttMin = d3.min(data, d => d.AVERAGE_ATTENDANCE);		// min and max of avg attendance
    // let avgAttMax = d3.max(data, d => d.AVERAGE_ATTENDANCE);
    // let matchesMin = d3.min(data, d => d.MATCHES);		// min and max of matches
    // let matchesMax = d3.max(data, d => d.MATCHES);
    // let teamsMin = d3.min(data, d => d.TEAMS);		// min and max of teams
    // let teamsMax = d3.max(data, d => d.TEAMS);

    // // changes the y-axis based on user selection
    // if (attribute == "GOALS"){
    // 	y.domain([0, goalsMax])
    // }
    // else if (attribute == "AVERAGE_GOALS"){
    // 	y.domain([0, avgGoalsMax]);
    // }
    // else if (attribute == "AVERAGE_ATTENDANCE"){
    // 	y.domain([0, avgAttMax]);
    // }
    // else if (attribute == "MATCHES"){
    // 	y.domain([0, matchesMax]);
    // }
    // else{
    // 	y.domain([0, teamsMax]);
    // }

    // yAxis.scale(y);
    // yAxisGroup.transition()
    // 	.duration(800)
    // 	.call(yAxis);

    // xAxis.scale(x);
    // xAxisGroup.transition()
    // 	.duration(800)
    // 	.call(xAxis);

    // // update the line chart
    // line.x(d => x(d.YEAR))
    // 	.y(d => y(d[attribute]));

    // path.datum(filteredData)
    // 	.transition()
    // 	.duration(800)
    // 	.attr("d", line);

    // // link data to the circles
    // let circles = svg.selectAll("circle")
    // 	.data(filteredData);

    // // the God-awful tooltip
    // // credit to Britteny Okorom-Achuinye and several piazza posts for support to get to this solution
    // let yearFormat = d3.timeFormat("%Y");
    // let tTip = d3.tip()
    // 	.attr("class", "d3-tip")
    // 	.html(d => d.EDITION + " - " + yearFormat(d.YEAR));

    // // enter
    // circles.enter()
    // 	.append("circle")
    // 	.attr("class", "tooltip-circle")
    // 	.merge(circles)
    // 	.on("mouseover", function(event, d){
    // 		tTip.show(d,this);
    // 	})
    // 	.on("mouseout", tTip.hide)
    // 	.on("click", function(event, d, i){
    // 		showEdition(d);
    // 	})
    // 	.transition()
    // 	.duration(800)
    // 	.attr("r", 7)
    // 	.attr("cx", d => x(d.YEAR))
    // 	.attr("cy", d => y(d[attribute]))
    // 	.call(tTip);

    // // remove circles
    // circles.exit().remove();

}