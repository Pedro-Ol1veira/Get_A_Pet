import Input from '../../form/Input';

function Register() {
    function handleChange(e) {

    }

    return(
        <section>
            <h1>Cadastrar</h1>
            <form>
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite o seu telefone"
                    handleOnChange={handleChange}
                />
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    handleOnChange={handleChange}
                />
                <Input
                    text="senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua senha"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Confirmação de senha"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirme a sua senha"
                    handleOnChange={handleChange}
                />
            </form>
        </section>
    );
};

export default Register;