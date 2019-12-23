import * as React from "react";

interface IProps {
    nextPage: () => void;
    prevPage: () => void;
    page: number;
    data: any[];
}

function withPagination<T extends IProps>(model: any, Component: React.ComponentType<T>) {
    return class ModelComponent extends React.Component<T> {
        state = {
            data: [],
            isLoading: false
        }
        handleNextPage = () => {

        }

        handlePrev = () => {

        }
        render() {
            return <Component {...this.props}
                nextPage={this.handleNextPage}
                prevPage={this.handlePrev}
                data={this.state.data}
                isLoading={this.state.isLoading}
            />
        }
    }
};

export default withPagination;