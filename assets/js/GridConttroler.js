class GridConttroler {

    //  The computedStyle returned is a string containing all columns actual sizes in pxs.
    //  So, to count them, I split the values in the string and return the array's length.  

    countColumns(grid) {
        const columnsNumber = window.getComputedStyle(grid)
            .getPropertyValue('grid-template-columns')
            .split(' ')
            .length;
        return columnsNumber;
    }

    // The same as the previous.

    countRows(grid) {
        const rowsNumber = window.getComputedStyle(grid)
            .getPropertyValue('grid-template-rows')
            .split(' ')
            .length;
        return rowsNumber;
    }

    countItems(grid) {
        const itemsNum = this.countColumns(grid) * this.countRows(grid);
        return itemsNum;
    }

    // CountColumns will return how many columns would fit the present screen size, so this number is used to setknow how many itens should be displayed as to display the first line only.
        // This method serves primarily for the good functioning of HideOtherRows method.  

    showFirstRow(grid) {
        const gridItems = Array.from(grid.querySelectorAll('div'));
        const colsPerRow = this.countColumns(grid);
        const firstRowCols = gridItems.slice(0, colsPerRow);

        for (let col of firstRowCols) {
            col.style.display = 'block';
        };

        return this;
    }


    // Hides all rows but the first.

    hideOtherRows(grid) {

        // showFirstRow is called to avoid hidding itens that should be in the first row in that moment

        this.showFirstRow(grid);

        if (this.countRows(grid) > 1) {
            const gridItems = Array.from(grid.querySelectorAll('div'));
            const colsPerRow = this.countColumns(grid);
            const otherRowsCols = gridItems.slice(colsPerRow);

            for (let col of otherRowsCols) {
                col.style.display = 'none';
            };
        }

        return this;
    }

    // Makes sure only the first row is visible and slideBtns are visibleor hidden. 

    formatGrids(grids) {
        grids.forEach(grid => {

            if (grid.classList.contains('intro-grid')) return;
            this.hideOtherRows(grid)
            this.showOrHideSlideBtns(grid);
            
        });

        return this;
    }

    // Shows if there are hidden itens, otherwise hides them.
        // The grid is used as a reference because the buttons were all put one before and the other after the grid

    showOrHideSlideBtns(grid) {
        if (this.isAllItemsVisible(grid)) {
            grid.nextElementSibling.style.display = 'none';
            grid.previousElementSibling.style.display = 'none';
            return;
        }
        grid.nextElementSibling.style.display = '';
        grid.previousElementSibling.style.display = '';
    }

    // Note that this onyl works after the calling of the methods that set the display attribute

    isAllItemsVisible(grid) {
        const gridItems = Array.from(grid.querySelectorAll('div'));
        const visibleItens = gridItems.filter(item => item.style.display === 'block');
        return gridItems.length === visibleItens.length;
    }

    slideGrid(grid, direction) {
        const gridItems = Array.from(grid.querySelectorAll('div'));
        const colsPerRow = this.countColumns(grid);

        // newRowIndes starts as an array of the indexs of the present visible itens

        let newRowIndex = [];
        gridItems.forEach((item, index) => {
            if (item.style.display === 'block') newRowIndex.push(index);
        });

        gridItems.forEach(item => item.style.display = 'none')

        if (direction === 'right') {

            newRowIndex = newRowIndex.map(item => item + colsPerRow);
            if (newRowIndex.at(0) >= gridItems.length) return this.hideOtherRows(grid);

            if (newRowIndex.at(-1) > gridItems.length - 1) {
                gridItems.slice(-colsPerRow)
                    .forEach(item => item.style.display = 'block');

                return;
            }

            gridItems.slice(newRowIndex.at(0), newRowIndex.at(-1) + 1)
                .forEach(item => item.style.display = 'block');

            return;
        }

        newRowIndex = newRowIndex.map(item => item - colsPerRow);

        if (newRowIndex.at(0) < 0 && (newRowIndex.at(-1) + 1) >= 0) {
            if ((newRowIndex.at(-1) + 1) === 0) {
                return gridItems.slice(newRowIndex.at(0))
                    .forEach(item => item.style.display = 'block');
            }

            this.showFirstRow(grid);

            return;
        }

        return gridItems.slice(newRowIndex.at(0), newRowIndex.at(-1) + 1)
            .forEach(item => item.style.display = 'block');
    }

}

const instance = new GridConttroler;
export default instance;