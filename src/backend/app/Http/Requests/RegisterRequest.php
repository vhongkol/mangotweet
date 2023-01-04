<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:50',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Name is required field!',
            'email.required' => 'Email is required field!',
            'password.required' => 'Password is required!',
            'c_password.required' => 'Password and confirm password must be same!'
        ];
    }
}