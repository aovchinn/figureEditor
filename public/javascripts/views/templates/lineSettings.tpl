    <form>
        <p class="heading">Properties (line)</p>
        <div class="row-wrap">
            <p>Start</p>
            <div class="start-controls row-wrap">
                <div class="column-wrap">
                    <input id="x1" name="x1" value="<%= data.x1 %>">
                    <label for="x1"> x </label>
                </div>
                <div class="column-wrap">
                    <input id="y1" name="y1" value="<%= data.y1 %>">
                    <label for="y1"> y </label>
                </div>
            </div>
        </div>
        <div class="row-wrap">
            <p>End</p>
            <div class="end-controls row-wrap">
                <div class="column-wrap">
                    <input id="x2" name="x2" value="<%= data.x2 %>">
                    <label for="x2"> x </label>
                </div>
                <div class="column-wrap">
                    <input id="y2" name="y2" value="<%= data.y2 %>">
                    <label for="y2"> y </label>
                </div>
            </div>
        </div>
        <div class="controls">
            <div class="row-wrap">
                <label for="stroke"> Color </label>
                <input id="stroke" name="stroke" type="color" value="<%= data.stroke %>">
            </div>
            <div class="row-wrap">
                <label for="stroke-width"> Width </label>
                <input id="stroke-width" name="stroke-width" value="<%= data['stroke-width'] %>">
            </div>
            <div class="row-wrap">
                <label for="stroke-dasharray"> Style </label>
                <input id="stroke-dasharray" name="stroke-dasharray" value="<%= data['stroke-dasharray'] %>">
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

        .start-controls, .end-controls {
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
        .controls   {
            margin: 10px 0px;
        }

        form input {
            margin: 5px 0px;
        }

        .heading{
            border-bottom: solid 2px green;
            padding-bottom: 5px;
        }

        .controls {
            display: flex;
            flex-direction: column;
        }

        .controls input {
            width: 20%;
        }
    </style>
