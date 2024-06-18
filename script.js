/**
 * Multiplication Table Generator
 * Author: Tejindra Khatri
 * Date: 06/17/2024
 */

$(document).ready(function () {
    // Initialize tabs
    $("#tabs").tabs();

    // Initialize validation
    $("#multiplicationForm").validate({
        rules: {
            startHorizontal: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            endHorizontal: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            startVertical: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            endVertical: {
                required: true,
                number: true,
                range: [-50, 50]
            }
        },
        messages: {
            startHorizontal: {
                required: "Please enter a starting horizontal number.",
                number: "Please enter a valid number.",
                range: "Please enter a number between -50 and 50."
            },
            endHorizontal: {
                required: "Please enter an ending horizontal number.",
                number: "Please enter a valid number.",
                range: "Please enter a number between -50 and 50."
            },
            startVertical: {
                required: "Please enter a starting vertical number.",
                number: "Please enter a valid number.",
                range: "Please enter a number between -50 and 50."
            },
            endVertical: {
                required: "Please enter an ending vertical number.",
                number: "Please enter a valid number.",
                range: "Please enter a number between -50 and 50."
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
        submitHandler: function (form) {
            $("#errorMessages").empty();
            generateTable();
        }
    });

    // Initialize sliders with two-way binding
    $("#sliderStartHorizontal").slider({
        min: -50,
        max: 50,
        slide: function (event, ui) {
            $("#startHorizontal").val(ui.value);
            generateTable();
        }
    });
    $("#startHorizontal").on("input", function () {
        $("#sliderStartHorizontal").slider("value", this.value);
        generateTable();
    });

    $("#sliderEndHorizontal").slider({
        min: -50,
        max: 50,
        slide: function (event, ui) {
            $("#endHorizontal").val(ui.value);
            generateTable();
        }
    });
    $("#endHorizontal").on("input", function () {
        $("#sliderEndHorizontal").slider("value", this.value);
        generateTable();
    });

    $("#sliderStartVertical").slider({
        min: -50,
        max: 50,
        slide: function (event, ui) {
            $("#startVertical").val(ui.value);
            generateTable();
        }
    });
    $("#startVertical").on("input", function () {
        $("#sliderStartVertical").slider("value", this.value);
        generateTable();
    });

    $("#sliderEndVertical").slider({
        min: -50,
        max: 50,
        slide: function (event, ui) {
            $("#endVertical").val(ui.value);
            generateTable();
        }
    });
    $("#endVertical").on("input", function () {
        $("#sliderEndVertical").slider("value", this.value);
        generateTable();
    });

    function generateTable() {
        const startHorizontal = parseInt($("#startHorizontal").val());
        const endHorizontal = parseInt($("#endHorizontal").val());
        const startVertical = parseInt($("#startVertical").val());
        const endVertical = parseInt($("#endVertical").val());

        let tableHtml = '<table border="1">';
        tableHtml += '<tr><th></th>';

        for (let j = startHorizontal; j <= endHorizontal; j++) {
            tableHtml += `<th>${j}</th>`;
        }
        tableHtml += '</tr>';

        for (let i = startVertical; i <= endVertical; i++) {
            tableHtml += `<tr><th>${i}</th>`;
            for (let j = startHorizontal; j <= endHorizontal; j++) {
                tableHtml += `<td>${i * j}</td>`;
            }
            tableHtml += '</tr>';
        }

        tableHtml += '</table>';

        let tabCount = $("#tabs ul li").length;
        let newTabId = `tabs-${tabCount + 1}`;
        $("#tabs").append(`<div id="${newTabId}">${tableHtml}</div>`);
        $("#tabs ul").append(`<li><a href="#${newTabId}">${startHorizontal}, ${endHorizontal}, ${startVertical}, ${endVertical}</a> <span class="ui-icon ui-icon-close" role="presentation"></span></li>`);
        $("#tabs").tabs("refresh");

        // Close tab
        $("#tabs ul li span.ui-icon-close").on("click", function () {
            let panelId = $(this).closest("li").remove().attr("aria-controls");
            $("#" + panelId).remove();
            $("#tabs").tabs("refresh");
        });
    }

    // Enable the table to generate initially without needing to click submit
    generateTable();
});
