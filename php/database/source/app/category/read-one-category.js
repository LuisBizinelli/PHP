$(document).ready(function () {

    // handle 'read one' button click
    $(document).on('click', '.read-one-category-button', function () {
        // category ID will be here
        // get category id
        var id = $(this).attr('data-id');

        // read category record based on given ID
        $.getJSON("api/category/read_one.php?id=" + id, function (data) {
            // read categorys button will be here
            var recordHtml = showRecord(data);

            // inject html to 'page-content' of our app
            $("#page-content").html(recordHtml);

            // chage page title
            changePageTitle("Read category");
        });
    });
});

function showRecord(data) {
    // start html
    var read_one_category_html = "";

    // when clicked, it will show the category's list
    read_one_category_html += "<div id='read-categorys' class='btn btn-primary pull-right m-b-15px read-categorys-button'>";
    read_one_category_html += "<span class='glyphicon glyphicon-list'></span> Read categorys";
    read_one_category_html += "</div>";

    // category data will be shown in this table
    read_one_category_html += "<table class='table table-bordered table-hover'>";

    // category name
    read_one_category_html += "<tr>";
    read_one_category_html += "<td class='w-30-pct'>Name</td>";
    read_one_category_html += "<td class='w-70-pct'>" + data.name + "</td>";
    read_one_category_html += "</tr>";

    // category price
    read_one_category_html += "<tr>";
    read_one_category_html += "<td>Price</td>";
    read_one_category_html += "<td>" + data.price + "</td>";
    read_one_category_html += "</tr>";

    // category description
    read_one_category_html += "<tr>";
    read_one_category_html += "<td>Description</td>";
    read_one_category_html += "<td>" + data.description + "</td>";
    read_one_category_html += "</tr>";

    // category category name
    read_one_category_html += "<tr>";
    read_one_category_html += "<td>Category</td>";
    read_one_category_html += "<td>" + data.category_name + "</td>";
    read_one_category_html += "</tr>";

    read_one_category_html += "</table>";

    return read_one_category_html;
}