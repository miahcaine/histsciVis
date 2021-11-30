let data;
let margin = {top: 40, right: 40, bottom: 60, left: 60};
let linecolor = "#723D46";

let width = $(".linechart").innerWidth() - margin.left - margin.right
		height = $(".linechart").innerHeight() - margin.top - margin.bottom;

let svg = d3.select(".linechart").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

loadData();

function loadData(){
    d3.csv("../data/global_tb_rates.csv").then(function(csv) {
        csv.forEach(function(d){
			// Convert string to 'date object'
			d.year = +d.year;
			d.val = +d.val;
		});

		// Store csv data in global variable
        data = csv;
        console.log(data);

		// Draw the visualization for the first time
		updateVisualization();
	});
}

function updateVisualization(){
    const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([15, 20]);

    const xScale = d3.scaleLinear()
    .range([0, width])
    .domain([2010, 2019]);

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

    svg.append("g")
    .attr("transform", `translate(0 , 0)`)
    .call(d3.axisLeft(yScale));

    // const line = d3.line().x(d => xScale(d.year)).y(d => yScale(d.val));
        // )
    svg.append("path")
    // .attr("transform", `translate(0, 0))`)
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", linecolor)
    // .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 4)
    .attr("d", d3.line()
        .x(function(d) { return xScale(d.year) })
        .y(function(d) { return yScale(d.val) }))

}