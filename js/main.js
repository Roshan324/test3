var data = [
    {
        x: ['Plastic'],
        y: [20],
        type: 'bar',
        hoverinfo: 'none',
        width: 0.1,
        name: 'Plastic', // Assign a unique name to each item
        marker: {
            color: 'rgba(255, 99, 132, 0.6)', // Adjust color if needed
            line: {
                color: 'rgb(255, 99, 132)',
                width: 5
            }
        }
    },
    {
        x: ['Metal'],
        y: [14],
        type: 'bar',
        hoverinfo: 'none',
        width: 0.1,
        name: 'Metal',
        marker: {
            color: 'rgba(255, 99, 132, 0.6)', // Adjust color if needed
            line: {
                color: 'rgb(255, 99, 132)',
                width: 5
            }
        }
    },
    {
        x: ['Paper'],
        y: [23],
        type: 'bar',
        hoverinfo: 'none',
        width: 0.1,
        name: 'Paper',
        marker: {
            color: 'rgba(255, 99, 132, 0.6)', // Adjust color if needed
            line: {
                color: 'rgb(255, 99, 132)',
                width: 5
            }
        }
    }
];

// Initial chart setup
function initializeChart() {
    const plasticInput = document.querySelector('.item[data-type="Plastic"] .rang-input');
    const metalInput = document.querySelector('.item[data-type="Metal"] .rang-input');
    const paperInput = document.querySelector('.item[data-type="Paper"] .rang-input');

    updateValue(plasticInput, 'Plastic');
    updateValue(metalInput, 'Metal');
    updateValue(paperInput, 'Paper');
}

initializeChart();

// Update the Plotly chart based on input values
function updateValue(input, itemType) {
    const rangeValueSpan = input.parentNode.querySelector('.range-value');
    rangeValueSpan.textContent = "%" + input.value;

    // Get the current value of the input range
    const inputValue = parseFloat(input.value);

    // Update the corresponding bar in the Plotly chart
    updateChart(itemType, inputValue);
}

// Recreate the entire Plotly chart with new values
function updateChart(itemType, value) {
    // Find the index of the item in the data array
    let itemIndex = -1;
    for (let i = 0; i < data.length; i++) {
        if (data[i].name === itemType) {
            itemIndex = i;
            break;
        }
    }

    // If the item is found, update its value in the chart
    if (itemIndex !== -1) {
        // Update the y value of the corresponding item
        data[itemIndex].y = [value];

        // Remove the existing chart
        Plotly.purge('chart_area');

        // Create a new chart with updated data
        Plotly.newPlot('chart_area', data, layout, config);
    }
}

// Initial Plotly chart setup
var layout = {
    showlegend: false,
    yaxis: {
        range: [0, 100],
        tickvals: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    },
    hovermode: 'y',
    bargap: 0.05, 
    bargroupgap: 0,
    textContent: 'center',
    paper_bgcolor: 'rgb(21, 38, 68)', // Light Blue with 50% transparency
    plot_bgcolor: 'rgba(0,0,0,0)',
    boxshadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',

};

var config = {
    responsive: true,
    displayModeBar: false,
    scrollZoom: false,
    staticPlot: true,
    modeBarButtonsToRemove: [
        "zoom2d", "pan2d", "select2d", "lasso2d", "zoomIn2d", "zoomOut2d", "autoScale2d", "resetScale2d",
        "hoverClosestCartesian", "hoverCompareCartesian",
        "zoom3d", "pan3d", "resetCameraDefault3d", "resetCameraLastSave3d", "hoverClosest3d",
        "orbitRotation", "tableRotation",
        "zoomInGeo", "zoomOutGeo", "resetGeo", "hoverClosestGeo",
        "toImage",
        "sendDataToCloud",
        "hoverClosestGl2d",
        "hoverClosestPie",
        "toggleHover",
        "resetViews",
        "toggleSpikelines",
        "resetViewMapbox"
    ],
    modeBar: false,
    displaylogo: false,
};
Plotly.newPlot('chart_area', data, layout, config);