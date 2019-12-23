import React from "react";

interface IProps<M> {
    nextPage: () => void;
    prevPage: () => void;
    page: number;
    data: M[];
}

function withPagination<M, T extends IProps<M>>(model: any, Component: React.ComponentType<T>) {
    return class ModelComponent extends React.Component<T> {
        state = {
            data: null,
            isLoading: false
        }
        fetch = (...args: any[]) => {
            this.setState({ data: model.paginate(...args) })
        }

        handleNextPage = () => {

        }

        handlePrev = () => {

        }
        render() {
            return (
                <Component {...this.props}
                    fetch={this.fetch}
                    nextPage={this.handleNextPage}
                    prevPage={this.handlePrev}
                    data={this.state.data}
                    isLoading={this.state.isLoading}
                />
            );
        }
    }
};

export default withPagination;