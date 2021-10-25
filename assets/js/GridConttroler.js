class GridConttroler {

    countColumns(grid) {
        const columnsNumber = window.getComputedStyle(grid)
            .getPropertyValue('grid-template-columns')
            .split(' ')
            .length;
        return columnsNumber;
    }

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

    hideOtherRows(grid) {
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

    showFirstRow(grid) {
        const gridItems = Array.from(grid.querySelectorAll('div'));
        const colsPerRow = this.countColumns(grid);
        const firstRowCols = gridItems.slice(0, colsPerRow);

        for (let col of firstRowCols) {
            col.style.display = 'block';
        };

        return this;
    }

    formatGrids(grids) {
        grids.forEach(grid => {

            if (grid.classList.contains('intro-grid')) return;

            this.hideOtherRows(grid)
        });

        return this;
    }

    slideGrid(grid, direction) {
        const gridItems = Array.from(grid.querySelectorAll('div'));
        const colsPerRow = this.countColumns(grid);

        let newRowIndex = [];

        gridItems.forEach((item, index) => {
            if (item.style.display === 'block') newRowIndex.push(index);
        });

        gridItems.forEach(item => item.style.display = 'none')

        if (direction === 'right') {

            newRowIndex = newRowIndex.map(item => item + colsPerRow);
            console.log(newRowIndex);
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