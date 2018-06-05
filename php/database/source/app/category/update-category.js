$(document).ready(function () {

    // show html form when 'update category' button was clicked
    $(document).on('click', '.update-category-button', function () {
        // category ID will be here
        // get category id
        var id = $(this).attr('data-id');

        // read one record based on given category id
        $.getJSON("api/category/read_one.php?id=" + id, function (data) {

            // values will be used to fill out our form
            var category = {
                id: id,
                name: data.name,
                price: data.price,
                description: data.description,
                categoryId: data.category_id,
                categoryName: data.category_name
            };

            // load list of categories will be here
            // load list of categories
            $.getJSON("api/category/read.php", function (data) {
                // build 'categories option' html
                var options = categoriesOptions(data.records, category.categoryId);

                // update category html will be here
                var updateHtml = updateCategoryHtml(options, category);

                // inject to 'page-content' of our app
                $("#page-content").html(updateHtml);

                // chage page title
                changePageTitle("Update category");
            });
        });
    });

    // 'update category form' submit handle will be here
    // will run if 'create category' form was submitted
    $(document).on('submit', '#update-category-form', function () {
        // get form data will be here 
        var $form = $(this);
        updateCategorySubmit($form);

        return false;
    });
});

function updateCategoryHtml(options, category) {
    // store 'update category' html to this variable
    var update_category_html = "";

    // 'read categorys' button to show list of categorys
    update_category_html += "<div id='read-categorys' class='btn btn-primary pull-right m-b-15px read-categorys-button'>";
    update_category_html += "<span class='glyphicon glyphicon-list'></span> Read categorys";
    update_category_html += "</div>";

    // build 'update category' html form
    // we used the 'required' html5 property to prevent empty fields
    update_category_html += "<form id='update-category-form' action='#' method='post' border='0'>";
    update_category_html += "<table class='table table-hover table-responsive table-bordered'>";

    // name field
    update_category_html += "<tr>";
    update_category_html += "<td>Name</td>";
    update_category_html += "<td><input value=\"" + category.name + "\" type='text' name='name' class='form-control' required /></td>";
    update_category_html += "</tr>";

    // price field
    update_category_html += "<tr>";
    update_category_html += "<td>Price</td>";
    update_category_html += "<td><input value=\"" + category.price + "\" type='number' min='1' name='price' class='form-control' required /></td>";
    update_category_html += "</tr>";

    // description field
    update_category_html += "<tr>";
    update_category_html += "<td>Description</td>";
    update_category_html += "<td><textarea name='description' class='form-control' required>" + category.description + "</textarea></td>";
    update_category_html += "</tr>";

    // categories 'select' field
    update_category_html += "<tr>";
    update_category_html += "<td>Category</td>";
    update_category_html += "<td>" + options + "</td>";
    update_category_html += "</tr>";

    update_category_html += "<tr>";

    // hidden 'category id' to identify which record to delete
    update_category_html += "<td><input value=\"" + category.id + "\" name='id' type='hidden' /></td>";

    // button to submit form
    update_category_html += "<td>";
    update_category_html += "<button type='submit' class='btn btn-info'>";
    update_category_html += "<span class='glyphicon glyphicon-edit'></span> Update category";
    update_category_html += "</button>";
    update_category_html += "</td>";

    update_category_html += "</tr>";

    update_category_html += "</table>";
    update_category_html += "</form>";

    return update_category_html;
}

function updateCategorySubmit($form) {
    // get form data
    var form_data = JSON.stringify($form.serializeObject());

    // submit form data to api
    $.ajax({
        url: "api/category/update.php",
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