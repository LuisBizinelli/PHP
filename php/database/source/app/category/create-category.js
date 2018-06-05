$(document).ready(function () {
    // show html form when 'create category' button was clicked
    $(document).on('click', '.create-category-button', function () {
        // categories api call will be here
        // load list of categories
        $.getJSON("api/category/read.php", function (data) {
            var options = categoriesOptions(data.records);

            var categoryHtml = createCategory(options);

            // inject html to 'page-content' of our app
            $("#page-content").html(categoryHtml);

            // chage page title
            changePageTitle("Create Category");
        });
    });

    // 'create category form' handle will be here
    // will run if create category form was submitted
    $(document).on('submit', '#create-category-form', function () {
        // form data will be here
        createCategorySubmit($(this));

        return false;
    });
});

function categoriesOptions(records) {
    // build categories option html
    // loop through returned list of data
    var categories_options_html = "";
    categories_options_html += "<select name='category_id' class='form-control'>";
    $.each(records, function (key, val) {
        categories_options_html += "<option value='" + val.id + "'>" + val.name + "</option>";
    });
    categories_options_html += "</select>";

    return categories_options_html;
}

function createCategory(options) {
    // we have our html form here where category information will be entered
    // we used the 'required' html5 property to prevent empty fields
    var create_category_html = "";

    // 'read categorys' button to show list of categorys
    create_category_html += "<div id='read-categorys' class='btn btn-primary pull-right m-b-15px read-categorys-button'>";
    create_category_html += "<span class='glyphicon glyphicon-list'></span> Read categorys";
    create_category_html += "</div>";

    // 'create category' html form
    create_category_html += "<form id='create-category-form' action='#' method='post' border='0'>";
    create_category_html += "<table class='table table-hover table-responsive table-bordered'>";

    // name field
    create_category_html += "<tr>";
    create_category_html += "<td>Name</td>";
    create_category_html += "<td><input type='text' name='name' class='form-control' required /></td>";
    create_category_html += "</tr>";

    // price field
    create_category_html += "<tr>";
    create_category_html += "<td>Price</td>";
    create_category_html += "<td><input type='number' min='1' name='price' class='form-control' required /></td>";
    create_category_html += "</tr>";

    // description field
    create_category_html += "<tr>";
    create_category_html += "<td>Description</td>";
    create_category_html += "<td><textarea name='description' class='form-control' required></textarea></td>";
    create_category_html += "</tr>";

    // categories 'select' field
    create_category_html += "<tr>";
    create_category_html += "<td>Category</td>";
    create_category_html += "<td>" + options + "</td>";
    create_category_html += "</tr>";

    // button to submit form
    create_category_html += "<tr>";
    create_category_html += "<td></td>";
    create_category_html += "<td>";
    create_category_html += "<button type='submit' class='btn btn-primary'>";
    create_category_html += "<span class='glyphicon glyphicon-plus'></span> Create category";
    create_category_html += "</button>";
    create_category_html += "</td>";
    create_category_html += "</tr>";

    create_category_html += "</table>";
    create_category_html += "</form>";

    return create_category_html;
}

function createCategorySubmit($form) {
    // get form data
    var form_data = JSON.stringify($form.serializeObject());
    // submit form data to api
    $.ajax({
        url: "api/category/create.php",
        type: "POST",
        contentType: 'application/json',
        data: form_data,
        success: function (result) {
            // category was created, go back to categorys list
            showCategorys("api/category/read_paging.php");
        },
        error: function (xhr, resp, text) {
            // show error to console
            console.log(xhr, resp, text);
        }
    });
}