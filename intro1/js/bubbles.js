class Bubbles {
    constructor(parentElement, data, is_covid) {
        this.parentElement = parentElement;
        this.data = data;

        // to handle data differently depending on type of bubbles
        this.is_covid = is_covid;
        // if (is_covid) {
        // this.data = getCovidDeaths(this.data);
        // }
        // else {
        //     this.data = getTBDeaths(this.data);
        // }
        this.bubbleColor = d3.scaleSequential(d3.interpolateBlues);
        this.initVis();
    }

    initVis() {
        let vis = this;
        vis.margin = { top: 20, bottom: 20, left: 20, right: 20 };
        vis.width = $(`#${vis.parentElement}`).width() - vis.margin.left - vis.margin.right;
        vis.height =
            $(`#${vis.parentElement}`).height() - vis.margin.top - vis.margin.bottom;

        vis.xCenter = (vis.width) / 2;
        vis.yCenter = (vis.height) / 2;
        vis.svg = d3
            .select(`#${vis.parentElement}`)
            .append("svg")
            .attr("width", vis.width)
            .attr("height", vis.height);
        // .call(responsivefy);


        vis.wrangleData();
    }
    wrangleData() {
        let vis = this;
        // create "data" for packed bubbles
        vis.nodes = Array.from(this.data, (d) => ({
            counted: false,
            x: vis.xCenter,
            y: vis.yCenter,
            r: Math.max(d.Cumulative_deaths / 100000, 3) // todo: fix scale of the radius
        }));

        //   // react to clicking filtering buttons
        //   if (changed) {
        //     if (boroughCode != -1){
        //       vis.boroughCode = boroughCode;
        //     }
        //     if (raceCode != -1){
        //       vis.raceCode = raceCode;
        //     }
        //   }
        // vis.dataByYear = {};
        //   vis.raceCodeObj = {
        //     0: "Total",
        //     1: "White Non Hispanic",
        //     2: "Black Non Hispanic",
        //     3: "Other Non Hispanic",
        //     4: "Hispanic"
        //   };

        //   vis.stopsRaceObj = {
        //     0 : [""],
        //     1 : ["W"],
        //     2 : ["B"],
        //     3 : ["Z", "A"],
        //     4 : ["P", "Q"]
        //   }

        //   vis.boroughObj = {
        //     2 : "Total",
        //     3 : "BRONX",
        //     4 : "BROOKLYN",
        //     5 : "MANHATTAN",
        //     6 : "QUEENS",
        //     7 : "STATEN ISLAND"
        //   }

        // vis.stopsObj = {
        //     3: 2,
        //     4: 3,
        //     5: 1,
        //     6: 4,
        //     7: 5
        // }
        //   vis.selectedDemographic = vis.raceCodeObj[vis.raceCode];
        //   vis.selectedBorough = vis.boroughObj[vis.boroughCode];
        // let deathCount;
        vis.color = "#C9CBA3";
        if (vis.is_covid) {
            // TODO: get the correct columns
            // if (changed){
            //   stopCount = vis.stopData[vis.raceCode][vis.selectedBorough];
            //   totalStopCount = vis.stopData[1][vis.selectedBorough] + vis.stopData[2][vis.selectedBorough] + vis.stopData[3][vis.selectedBorough]
            //                    + vis.stopData[4][vis.selectedBorough];
            // } else {
            // deathCount = vis.data[];
            // totalStopCount = 1;
            // }
            // vis.demPerc = 100 * (stopCount / totalStopCount);
            // if (changed) {
            //     if (vis.boroughCode == 2) {
            //         vis.selectedBorough = "New York City";
            //     } else {
            //         let fixTitle = vis.selectedBorough.toLowerCase().split(" ");
            //         if (fixTitle.length > 1) {
            //             let temp1 = fixTitle[0][0].toUpperCase() + fixTitle[0].slice(1);
            //             let temp2 = fixTitle[1][0].toUpperCase() + fixTitle[1].slice(1);
            //             vis.selectedBorough = [temp1, temp2].join(" ");
            //         } else {
            //             vis.selectedBorough = fixTitle[0][0].toUpperCase() + fixTitle[0].slice(1);
            //         }
            //     }
            //     let popPerc = parseInt($("#perc-holder").text(), 10);
            //     $(`#${vis.percParent}`).text(`${vis.selectedDemographic} people make up ${((vis.demPerc)).toFixed()}% of the stops in ${vis.selectedBorough}.`);
            //     if (popPerc < vis.demPerc.toFixed()) {
            //         $(`#${vis.percParent}`).css("color", "#8B0000");
            //         vis.color = "#8B0000";
            //     } else {
            //         $(`#${vis.percParent}`).css("color", "black");
            //     }
            console.log("IS COVID");
        } else {
            // TODO: when showing both bubble vis, change vis color to the coral color
            // TODO: get correct columns from TB DATA
            console.log("IS TB");
        }
        // } else {
        //     if (changed) {
        //         vis.demPop = vis.popObj[vis.raceCode][vis.boroughObj[vis.boroughCode]];
        //         vis.totalPop = vis.popObj[1][vis.boroughObj[vis.boroughCode]] + vis.popObj[2][vis.boroughObj[vis.boroughCode]]
        //             + vis.popObj[3][vis.boroughObj[vis.boroughCode]] + vis.popObj[4][vis.boroughObj[vis.boroughCode]];
        //     } else {
        //         vis.demPop = 1;
        //         vis.totalPop = 1;
        //     }

        // GET PERCENTAGE
        // vis.demPerc = (vis.demPop / vis.totalPop) * 100;
        // if (changed) {
        //     if (vis.boroughCode == 2) {
        //         vis.selectedBorough = "New York City";
        //     } else {
        //         let fixTitle = vis.selectedBorough.toLowerCase().split(" ");
        //         if (fixTitle.length > 1) {
        //             let temp1 = fixTitle[0][0].toUpperCase() + fixTitle[0].slice(1);
        //             let temp2 = fixTitle[1][0].toUpperCase() + fixTitle[1].slice(1);
        //             vis.selectedBorough = [temp1, temp2].join(" ");
        //         } else {
        //             vis.selectedBorough = fixTitle[0][0].toUpperCase() + fixTitle[0].slice(1);
        //         }
        //     }
        //     $(`#${vis.percParent}`).text(`${vis.selectedDemographic} people make up ${((vis.demPerc)).toFixed()}% of the population in ${vis.selectedBorough}.`);
        //     $(`#perc-holder`).text(`${vis.demPerc.toFixed()}`);
        // }
        // }
        // associate bubbles with counted-ness????
        // for (var i = 0; i < vis.demPerc.toFixed(); i++) {
        //     vis.nodes[i].counted = true;
        // }

        vis.updateVis();
    }
    updateVis() {
        // create the circles
        let vis = this;
        var svg = vis.svg; 
        var data = vis.nodes;
        

        var simulation = d3.forceSimulation(data)
            .force("charge", d3.forceManyBody().strength([-20]))
            .force("x", d3.forceX().strength([0.15]).x(vis.xCenter))
            .force("y", d3.forceY().strength([0.15]).y(vis.yCenter))
            .force("collision", d3.forceCollide().radius(d => d.radius + 50)); // todo: fix the radius of the

        var node = svg.selectAll(".circles")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", d => d.r)
            .attr("fill", vis.color);

        simulation.nodes(data)
            .on("tick", d => {
                node.attr("cx", d => d.x).attr("cy", d => d.y);
            });

    }
}