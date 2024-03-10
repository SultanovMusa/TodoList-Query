/* eslint-disable @typescript-eslint/no-unused-vars */
export namespace CRUD {
	type GetCrudRequest = void;
	type GetCrudResponse = {
		_id?: number;
		firstName: string;
		image: string;
	}[];
  // ! POST
	type CreateCrudRequest = {
		_id?: number;
		firstName: string;
		image: string;
	};
	type CreateCrudResponse = {
		_id?: number;
		firstName: string;
		image: string;
	}[];
	// ! DELETE
	type deleteCrudRequest = number;
	type deleteCrudResponse = {
		_id?: number;
	}[];

	// !PATHC
	type PatchCrudRequest  =  {
		_id?: number;
		newData: {
			firstName: string;
			image: string;
		}
	};
	type PatchCrudResponse = {
		_id?: number;
		newData: {
			nafirstName: string;
			image: string;
		}
	}[];
}
