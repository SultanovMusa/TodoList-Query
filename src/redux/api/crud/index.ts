import { api as index } from "..";
import { CRUD } from "./types";

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getTodos: builder.query<CRUD.GetCrudResponse, CRUD.GetCrudRequest>({
			query: () => ({
				url: "",
				method: "GET",
			}),
			providesTags: ["crud"],
		}),

		createTodo: builder.mutation<
			CRUD.CreateCrudResponse,
			CRUD.CreateCrudRequest
		>({
			query: ({ firstName, image }) => ({
				url: "",
				method: "POST",
				body: { firstName, image },
			}),
			invalidatesTags: ["crud"],
		}),

		deleleTodo: builder.mutation<
			CRUD.deleteCrudResponse,
			CRUD.deleteCrudRequest
		>
		({
			query: (_id) => ({
				url: `${_id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["crud"],
		}),

		patchTodo: builder.mutation<
		CRUD.PatchCrudResponse, 
		CRUD.PatchCrudRequest
		>({
			query: ({ _id, newData }) => ({
				url: `${_id}`,
				method: "PATCH",
				body: newData,
			}),
			invalidatesTags: ["crud"],
		}),
	}),
});

export const {
	useGetTodosQuery,
	useCreateTodoMutation,
	useDeleleTodoMutation,
	usePatchTodoMutation,
} = api;
