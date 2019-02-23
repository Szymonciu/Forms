export class Produkt {
    WartośćVat: number;
    WartośćBrutto: number;
    PodatekVat = 23;
    public Ilosc: number;
    public LoginUzytkownika: string;
    public CenaNetto: number; 
    public JednostkaMiary: string;
    
    constructor(public Nazwa: string) {
    }

    public WartoscVat(){
        return this.CenaNetto * this.Ilosc * this.PodatekVat / 100;
    }
    public WartoscBrutto(){
        var vat = this.WartoscVat();
        return vat + (this.CenaNetto * this.Ilosc);
    }
}