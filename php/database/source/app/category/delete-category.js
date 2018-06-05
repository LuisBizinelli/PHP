$(document).ready(function () {

    // will run if the delete button was clicked
    $(document).on('click', '.delete-category-button', function () {
        // category id will be here
        // get the category id
        var category_id = $(this).attr('data-id');

        // bootbox for good looking 'confirm pop up'
        bootbox.confirm({

            message: "<h4>Are you sure?</h4>",
            buttons: {
                confirm: {
                    label: '<span class="glyphicon glyphicon-ok"></span> Yes',
                    className: 'btn-danger'
                },
                cancel: {
                    label: '<span class="glyphicon glyphicon-remove"></span> No',
                    className: 'btn-primary'
                }
            },
            callback: function (isConfirmed) {
                // delete request will be here
                if (isConfirmed) {
                    // send delete request to api / remote server
                    $.ajax({
                        url: "api/category/delete.php",
                        type: "POST",
                        dataType: 'json',
                        data: JSON.stringify({ id: category_id }),
                        success: function (result) {
                            // re-load list of categorys
                            showcategorys("api/category/read_paging.php");
                        },
                        error: function (xhr, resp, text) {
                            console.log(xhr, resp, text);
                        }
                    });
                }
            }
        });
    });
});

