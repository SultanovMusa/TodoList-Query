/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import scss from "./TodoList.module.scss";
import {
	useCreateTodoMutation,
	useGetTodosQuery,
	useDeleleTodoMutation,
	usePatchTodoMutation,
} from "../redux/api/crud";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { IoImageOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
import { BsSave2Fill } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";

const TodoList = () => {
	const [firstName, setFirstName] = useState<string>("");
	const [image, setImage] = useState<string>("");

	const [name, setName] = useState<string>("");
	const [img, setImg] = useState<string>("");
	const [isEdit, setIsEdit] = useState<number | null>(null);

	const { data, isLoading } = useGetTodosQuery();
	const [createTodo] = useCreateTodoMutation();
	const [deleteTodo] = useDeleleTodoMutation();
	const [editTodo] = usePatchTodoMutation();

	// !POST
	const addTodo = async () => {
		if (firstName === "" && image === "") {
			alert("kandai");
		} else {
			await createTodo({ firstName, image });
			setFirstName("");
			setImage("");
		}
	};
	// !DELETE
	const removeTodo = async (_id: number) => {
		await deleteTodo(_id);
	};

	// !EDIT
	const editTodoItem = (item: any) => {
		setName(item.firstName);
		setImg(item.image);
		setIsEdit(item._id);
	};
	// !PATCH
	const saveTodo = async (_id: number) => {
		const newData = {
			firstName: name,
			image: img,
		};
		await editTodo({ _id, newData });
		setIsEdit(null);
	};

	return (
		<div className={scss.content}>
			<h1>TodoList</h1>
			<hr />
			<div className="containers">
				{isLoading ? (
					<h1>Loading...</h1>
				) : (
					<>
						<div className={scss.form}>
							<div className={scss.input_box}>
								<input
									className={scss.input}
									type="text"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									placeholder="Text"
									required
								/>
								<BsFillChatRightTextFill className={scss.icon} />
							</div>
							<div className={scss.input_box}>
								<input
									className={scss.input}
									type="url"
									placeholder="Url"
									value={image}
									onChange={(e) => setImage(e.target.value)}
								/>
								<IoImageOutline className={scss.icon} />
							</div>
							<button onClick={addTodo}>Add</button>
						</div>
						<hr />

						{data?.map((item) => (
							<div key={item._id}>
								{isEdit === item._id ? (
									<div className={scss.forms}>
										<div className={scss.input_box}>
											<input
												className={scss.input}
												type="text"
												value={name}
												onChange={(e) => setName(e.target.value)}
												placeholder="Text"
												required
											/>
											<BsFillChatRightTextFill className={scss.icon} />
										</div>
										<div className={scss.input_box}>
											<input
												className={scss.input}
												type="url"
												placeholder="Url"
												value={img}
												onChange={(e) => setImg(e.target.value)}
											/>
											<IoImageOutline className={scss.icon} />
										</div>
										<div className={scss.cars}>
											<button onClick={() => saveTodo(item._id!)}>
												<BsSave2Fill />
											</button>
											<button onClick={() => setIsEdit(null)}>
												<ImCancelCircle />
											</button>
										</div>
									</div>
								) : (
									<div className={scss.card}>
										<h2>{item.firstName}</h2>
										<hr />
										<img src={item.image} alt="foto" />
										<div className={scss.cars}>
											<button onClick={() => removeTodo(item._id!)}>
												<RiDeleteBin5Line />
											</button>
											<button onClick={() => editTodoItem(item)}>
												<MdEditSquare />
											</button>
										</div>
									</div>
								)}
							</div>
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default TodoList;
