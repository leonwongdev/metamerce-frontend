const LoadingButton = (props) => {
  const isDisabled = props.isLoading ? "disabled" : "";
  return (
    <button className={`btn ${props.styleClasses}`} type={props.type} onclick={props.onclick} disabled={isDisabled}>
      {props.isLoading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        props.label
      )}
    </button>
  );
};

export default LoadingButton;
