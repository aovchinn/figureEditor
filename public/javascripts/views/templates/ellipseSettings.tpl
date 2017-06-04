<form>
    <p class="heading">Properties (ellipse)</p>
    <div class="row-wrap">
        <p>Size</p>
        <div class="size-controls row-wrap">
            <div class="column-wrap">
                <input id="cx" name="cx" value="<%= data.cx %>">
                <label for="cx"> x </label>
            </div>
            <div class="column-wrap">
                <input id="cy" name="cy" value="<%= data.cy %>">
                <label for="cy"> y </label>
            </div>
        </div>
    </div>
    <div class="row-wrap">
        <p>Position</p>
        <div class="position-controls row-wrap">
            <div class="column-wrap">
                <input id="rx" name="rx" value="<%= data.rx %>">
                <label for="rx"> rx </label>
            </div>
            <div class="column-wrap">
                <input id="ry" name="ry" value="<%= data.ry %>">
                <label for="ry"> ry </label>
            </div>
        </div>
    </div>
    <div class="background">
        <div class="row-wrap">
            <label for="fill"> Background </label>
            <input id="fill" type="color" name="fill" value="<%= data.fill %>">
        </div>
    </div>
    <div class="border">
        <p>Border</p>
        <div class="row-wrap">
            <label for="stroke"> Color </label>
            <input id="stroke" type="color" name="stroke" value="<%= data.stroke %>">
        </div>
        <div class="row-wrap">
            <label for="stroke-width"> Width </label>
            <input id="stroke-width" name="stroke-width" value="<%= data['stroke-width'] %>">
        </div>
        <div class="row-wrap">
            <label for="stroke-dasharray"> Style </label>
            <select name="stroke-dasharray">
                <option value="0" selected>solid</option>
                <option value="8, 10" >dashed</option>
                <option value="1, 4">dotted</option>
            </select>
            <%
                    $(function() {
                        const select = $('select[name="stroke-dasharray"]');
                        select.find('option:selected').removeAttr('selected');
                        const options = {
                            '8, 10' : 'dashed',
                            '1, 4' : 'dotted',
                            '0': 'solid'
                        };
                        let strokedash = data['stroke-dasharray'];
                        if (!options[strokedash]){
                            strokedash ='0';
                        }
                        $('[value="' + strokedash + '"]')
                            .attr('selected', 'selected');

                    })
                %>
        </div>
    </div>
    <input type="submit" value="save">
</form>

<style type="text/css" media="screen">
    form {
        display: flex;
        flex-direction: column;
        width: 50%;
    }

    form p {
        margin: 5 0;
        font-weight: 600;
    }

    .size-controls,
    .position-controls {
        width: 70%;
    }

    .column-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .column-wrap input {
        width: 80%;
    }

    .row-wrap {
        display: flex;
        flex-direction: row;
        align-items: baseline;
        justify-content: space-between;
    }

    .background,
    .border {
        padding: 10px 0px;
    }

    form input {
        margin: 5px 0px;
    }

    .background {
        margin-top: 5px;
        border-top: solid 2px green;
        border-bottom: solid 2px green;
        font-weight: 600;
    }

    .heading {
        border-bottom: solid 2px green;
        padding-bottom: 5px;
    }

    .border {
        display: flex;
        flex-direction: column;
    }

    .border input {
        width: 20%;
    }
</style>
