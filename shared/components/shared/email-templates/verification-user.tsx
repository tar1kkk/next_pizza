interface Props {
    code : string;
}

export const VerificationUser: React.FC<Props> = ({code}) => (
    <div>
        <p>Код подтверждения: <h2>{code}</h2></p>

        <p><a href={`https://localhost:3000/api/auth/verify?code=${code}`}>Подтвердите регистрацию</a></p>
    </div>
)