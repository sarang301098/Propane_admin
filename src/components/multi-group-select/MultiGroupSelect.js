import Select from "react-select";

const Group = (props) => {
  return (
    <Select
      // components={{
      //   GroupHeading: () => (
      //     <div onClick={() => console.log("i am a group and i am clickable .. yay!")}>My Group Heading</div>
      //   ),
      // }}
      {...props}
      options={props.options}
      onChange={props.onChange}
      value={props.value}
      // menuIsOpen={false}
      hideSelectedOptions={true}
      closeMenuOnSelect={false}
      isMulti
      placeholder="-- Select --"
    />
  );
};

export default Group;
