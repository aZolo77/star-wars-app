import React, { Component } from 'react';

// components
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

// HOC (Higher-Order-Component) - Обёртка для логики, используемой в нескольких компонентах
const withData = View => {
  // Возвращаем анонимный компонент
  return class extends Component {
    state = {
      data: null,
      loading: true,
      error: false
    };

    // Component Initialized
    componentDidMount() {
      // getting Data
      this.update();
    }

    // on Updating Props
    componentDidUpdate(prevProps) {
      // Проверка ОБЯЗАТЕЛЬНА, чтобы не зациклить код!!
      if (this.props.getData !== prevProps.getData) {
        this.update();
      }
    }

    update() {
      this.setState({
        loading: true,
        error: false
      });

      // getting Data
      this.props
        .getData()
        .then(data => {
          this.setState({ data, loading: false });
        })
        .catch(err => {
          this.setState({ error: true, loading: false });
        });
    }

    render() {
      const { data, loading, error } = this.state;

      if (loading) {
        return <Spinner />;
      }

      if (error) {
        return <ErrorIndicator />;
      }

      return <View {...this.props} data={data} />;
    }
  };
};

export default withData;
